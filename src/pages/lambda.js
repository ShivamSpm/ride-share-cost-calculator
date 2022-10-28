const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.handler = async (event, context, callback) => {
    // TODO implement
    // console.log(event);
    if(event['path']=="/signup"){
        const parsedEvent = JSON.parse(event['body']);
        const data = await getUserByEmail(parsedEvent);
        if(data['Item']){
            return response(409, "This email already exists")
        }
        await putUser(JSON.parse(event['body'])).then(()=>{
            callback(null, {
                statusCode:201,
                body:'',
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
            })
        }).catch((err) => {
            console.error(err)
        })
    }
    
    else if(event['path']=="/login"){
        const parsedEvent = JSON.parse(event['body']);
        const data = await getUserByEmail(parsedEvent);
        
        if(data['Item']){
            if(parsedEvent['password']==data['Item']['Password']){
                // console.log("Successful")
                return response(200, JSON.stringify(data['Item']));
            }
            return response(401, false);
        }
        // console.log("Unsuccessful")
        return response(401, false);
        
    }
    
    else if(event['path']=="/getAllUsers"){
        
        const params = {
        TableName: 'Ride-share-table'
        };
        
        const scanResults = [];
        var items = {};
        do{
            items =  await ddb.scan(params).promise();
            items.Items.forEach((item) => scanResults.push(item));
            params.ExclusiveStartKey  = items.LastEvaluatedKey;
        }while(typeof items.LastEvaluatedKey !== "undefined");
        
        for(let i = 0; i < scanResults.length; i++){
            delete scanResults[i]['Username'];
            delete scanResults[i]['Password'];
        }
        console.log(scanResults);
        return response(200, JSON.stringify(scanResults));
    }
    
    else if(event['path']=="/saveRide"){
        // console.log(event);
        const parsedEvent = JSON.parse(event['body']);
        console.log(parsedEvent);
        // console.log(typeof parsedEvent[parsedEvent.length - 1]);
        // console.log(parsedEvent[parsedEvent.length - 1]['riderEmail']);
        let riderData = await getRiderData(parsedEvent[parsedEvent.length - 2]['riderEmail']);
        riderData = riderData['Item'];
        console.log("Rider data");
        console.log(riderData);
        let distance = Number(parsedEvent[parsedEvent.length - 1]['distance']);
        let moneyOwed = Number(riderData['FuelCost']) * distance / Number(riderData['Mileage'])
        
        moneyOwed = moneyOwed / (parsedEvent.length - 2);
        console.log(moneyOwed);
        
        for(let i = 0; i < parsedEvent.length - 2; i++){
            console.log(parsedEvent[i]);
            
            const params = {
            TableName: 'Ride-Saving-Table',
            Key: {
              'PassengerId': parsedEvent[i]['title'],
              'RiderId': parsedEvent[parsedEvent.length - 2]['riderEmail'],
            },
            UpdateExpression: 'set RiderName = :rn, Distance = if_not_exists(Distance, :initial) + :d, MoneyOwed = if_not_exists(MoneyOwed, :initial) + :m',
            ExpressionAttributeValues: {
                ':rn': parsedEvent[parsedEvent.length - 2]['riderName'],
                ':d': distance,
                ':m': moneyOwed,
                ':initial': 0
            },
      };

        await ddb.update(params).promise();
        }
        
        return response(200, true);
    }
    
    
    else if(event['path'] == "/saveMileageAndCost"){
        const parsedData = JSON.parse(event['body']);
        console.log(parsedData);
  
        const params = {
            TableName: 'Ride-share-table',
            Key: {
              'email': parsedData['email'],
            },
            UpdateExpression: 'set Mileage = :m, FuelCost = :f',
            ExpressionAttributeValues: {
              ':m': parsedData['mileage'],
              ':f': parsedData['gasCost']
            },
      };

        await ddb.update(params).promise();
        return response(200, true);
    }
    
    else if(event['path'] == "/getMoneyOwed"){
        // console.log(event['body']);
        console.log(event['queryStringParameters']);
        const riderId = event['queryStringParameters']['data'];
        console.log(riderId);
        let moneyOwedData = [];
        try {
        var params = {
            TableName: 'Ride-Saving-Table',
            FilterExpression: 'contains (RiderId, :r)',
            ExpressionAttributeValues : {   
            ':r' : riderId
            }
        };
        moneyOwedData = await ddb.scan(params).promise();
        console.log(JSON.stringify(moneyOwedData));
    } catch (error) {
        console.error(error);
    }
        
        return response(200, JSON.stringify(moneyOwedData['Items']));
    }
    
    else if(event['path'] == "/getMoneyYouOwe"){
        const passengerId = event['queryStringParameters']['data'];
        console.log(passengerId);
        let moneyYouOweData = [];
        try {
        const params = {
            TableName: 'Ride-Saving-Table',
            KeyConditionExpression: 'PassengerId = :p',
            ExpressionAttributeValues: {
                ':p': passengerId
            },
            
        };
        moneyYouOweData = await ddb.query(params).promise();
        console.log(JSON.stringify(moneyYouOweData));
    } catch (error) {
        console.error(error);
    }
    return response(200, JSON.stringify(moneyYouOweData['Items']));
    }
    
    
    else if(event['path'] == "/getCurrentMileageAndCost"){
        const riderId = event['queryStringParameters']['data'];
        console.log(riderId);
        
        var currMilAndCostData = []
        const params= {
        TableName: 'Ride-share-table',
        Key: {
            email: riderId
        }
    };
    try{
        currMilAndCostData = await ddb.get(params).promise();
    }catch(err){
        return err;
    }
    console.log(currMilAndCostData);
        return response(200, JSON.stringify(currMilAndCostData['Item']));
    }
    
    else if(event['path'] == "/settleUp"){
        const parsedData = JSON.parse(event['body']);
        console.log(parsedData);
        const params = {
            TableName: 'Ride-Saving-Table',
            Key: {
              'PassengerId': parsedData['PassengerId'],
              'RiderId': parsedData['RiderId']
            },
            UpdateExpression: 'set MoneyOwed = :m',
            ExpressionAttributeValues: {
              ':m': 0
            }
      };
        await ddb.update(params).promise();
        return response(200, true);
    }
    
    return response(200, true);
};

function response(statusCode, body){
    return {
        statusCode: statusCode,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: body
    };
}

function putUser(userData){
    const userName = userData['firstName'].concat(' ',userData['lastName']);
    const data = {
        TableName: 'Ride-share-table',
        Item: {
            'email': userData['email-address'],
            'Password': userData['password'],
            'Username': userData['username'],
            'Name': userName
        }
    };
    return ddb.put(data).promise();
}

function getUserByEmail(userData){
    
    const params= {
        TableName: 'Ride-share-table',
        Key: {
            email: userData['email-address']
        }
    };
    try{
        return ddb.get(params).promise();
    }catch(err){
        return err;
    }
}

function getRiderData(riderId){
    const params= {
        TableName: 'Ride-share-table',
        Key: {
            email: riderId
        }
    };
    try{
        return ddb.get(params).promise();
    }catch(err){
        return err;
    }
    
}


// Update LoggedIn value code

// const params= {
                //     TableName: 'Ride-share-table',
                //     Key: {
                //         'email': parsedEvent['email-address']
                //     },
                //     UpdateExpression: 'set LoggedIn = :r',
                //     ExpressionAttributeValues: {
                //       ':r': true,
                //     },
                // };
                // await ddb.update(params).promise();