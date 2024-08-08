from flask import Flask, jsonify, request, redirect, flash

from repository.transaction_repository import TransactionRepository

app = Flask(__name__)


@app.route('/buy',methods=['POST'])
def buy_holding():
    data = request.json
    # print(data)
    transaction_type = data["transaction_type"]
    symbol = data["symbol"]
    volume = data["volume"]
    price = data["price"]
    result = TransactionRepository.transaction_completed({"transaction_type":transaction_type,"symbol":symbol,"volume":volume,"price":price})

    if result == -1:
        return jsonify({"error": "Couldn't buy holding due to DB error"}), 404
    elif not result:
        return jsonify({"error": "Couldn't buy holding due to Client Error"}), 404
    else:
        return jsonify(result.data), 200


@app.route('/all_transactions',methods=['GET'])
def getAllTransactions():
    
    allTransactions=TransactionRepository.getAllTransactions()
    if allTransactions == -1:
        return jsonify({"error" : "couldn't fetch data"}),404
    else:
        return jsonify(allTransactions.data),200


if __name__ == "__main__":
    app.run(debug=True)


