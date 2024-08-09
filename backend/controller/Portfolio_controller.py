from flask import Flask, jsonify, request, redirect, flash

from repository.transaction_repository import TransactionRepository
from repository.PortfolioHoldings import PortfolioHoldings
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/buy',methods=['POST'])
def buy_holding():
    data = request.json
    # print(data)
    transaction_type = data["transaction_type"]
    symbol = data["symbol"]
    volume = data["volume"]
    price = data["price"]
    name = data["name"]
    result = PortfolioHoldings.buy_holding(symbol,name,volume,price)

    if result == -1:
        return jsonify({"error": "Couldn't buy holding due to DB error"}), 404
    elif not result:
        return jsonify({"error": "Couldn't buy holding due to Client Error"}), 404
    else:
        return jsonify(result.data), 200




@app.route('/all_holdings',methods=['GET'])
def getAllHoldings():
    
    allHoldings=PortfolioHoldings.get_all_holdings()
    if allHoldings == -1:
        return jsonify({"error" : "couldn't fetch data"}),404
    else:
        return jsonify(allHoldings),200


@app.route('/all_transactions',methods=['GET'])
def getAllTransactions():
    
    allTransactions=TransactionRepository.getAllTransactions()
    if allTransactions == -1:
        return jsonify({"error" : "couldn't fetch data"}),404
    else:
        return jsonify(allTransactions),200


if __name__ == "__main__":
    app.run(debug=True)


