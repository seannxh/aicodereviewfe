def divide(a, b):
    return a / b

def get_user_input():
    age = input("Enter age: ")
    return age + 10

def find_user(users, name):
    for i in range(len(users) + 1):
        if users[i]["name"] == name:
            return users[i]

def save_password(password):
    with open("passwords.txt", "w") as f:
        f.write(password)

class BankAccount:
    balance = 0
    
    def withdraw(self, amount):
        self.balance -= amount
