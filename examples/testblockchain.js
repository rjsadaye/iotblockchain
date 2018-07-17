const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection

var contractInsurance = (async function(input){
    try{
        this.bizNetworkConnection = new BusinessNetworkConnection()
        let connection = await this.bizNetworkConnection.connect('admin@iot')
        //this.input=input
        /*const args = process.argv.slice(2)
        const pIdBuyer = args.shift()
        const pIdSeller = args.shift()
        const realEstateId = args.shift()
        const loanId = args.shift()
        const realEstateAgentId = args.shift()
        const notaryId = args.shift()
        const insuranceId = args.shift()
        */
        let transaction = {
            "$class": "org.acme.iot.adddata"
        }
        transaction.data=input
        let serializer = connection.getSerializer()
        let resource = serializer.fromJSON(transaction)
        await this.bizNetworkConnection.submitTransaction(resource)
        console.log('Transaction Completed!')
        process.exit()
    }catch( err ){
        console.log(err)
        process.exit()
    }
})()

module.exports = contractInsurance
