class Transaction:

    def __init__(self, transaction_id, transaction_type, symbol, name="", price=0.0, currency="",
                 volume=None, date_time=None):
        self.__transaction_id = transaction_id  # Unique transaction ID
        self.__transaction_type = transaction_type  # Type of transaction (e.g., "buy", "sell")
        self.__symbol = symbol  # Stock symbol (e.g., AAPL)
        self.__name = name  # Name of the stock
        self.__price = price  # Current price of the stock
        # self.__currency = currency  # Currency of the stock (e.g., USD)
        self.__volume = volume  # Trading volume
        self.__date_time = date_time  # Date and time of the record

    @property
    def transaction_id(self):
        return self.__transaction_id

    @property
    def transaction_type(self):
        return self.__transaction_type

    @transaction_type.setter
    def transaction_type(self, value):
        self.__transaction_type = value

    @property
    def symbol(self):
        return self.__symbol

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, value):
        self.__name = value

    @property
    def price(self):
        return self.__price

    @price.setter
    def price(self, value):
        self.__price = value

    @property
    def currency(self):
        return self.__currency

    @currency.setter
    def currency(self, value):
        self.__currency = value

    @property
    def volume(self):
        return self.__volume

    @volume.setter
    def volume(self, value):
        self.__volume = value

    @property
    def date_time(self):
        return self.__date_time

    @date_time.setter
    def date_time(self, value):
        self.__date_time = value

    def __str__(self):
        return (f"***Transaction Details --> transaction_id: {self.__transaction_id}, "
                f"transaction_type: {self.__transaction_type}, symbol: {self.__symbol}, "
                f"name: {self.__name}, price: {self.__price}, currency: {self.__currency}, "
                f"date_time: {self.__date_time}")

    # Converting object to dictionary
    def to_dict(self):
        return {
            "transaction_id": self.__transaction_id,
            "transaction_type": self.__transaction_type,
            "symbol": self.__symbol,
            "name": self.__name,
            "price": self.__price,
            "currency": self.__currency,
            "volume": self.__volume,
            "date_time": self.__date_time
        }

    # Converting JSON to our object
    @staticmethod
    def from_dict(data):
        return Transaction(**data)


if __name__ == "__main__":
    t1 = Transaction(
        transaction_id=1,
        transaction_type='buy',
        symbol='AAPL',
        name='Apple Inc.',
        price=145.30,
        currency='USD',
        volume=1000000,
        date_time='2024-08-08 10:00:00'
    )

    print(t1)  # Print the transaction details
    print(t1.to_dict())  # Convert to dictionary