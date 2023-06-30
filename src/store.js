
const store = {
    state: {
        BASE_URL: process.env.VUE_APP_MOCKAPI_SERVICE_URL,
        shoppingList: [],
        devices: [],
        user: {
            name: '',
            email: '',
            isAdmin: false,
            isLogged: false,
            purchases: []
        },
        navBar:[
            {title: "Store",comp:"MainCard", to:"/", visible:true},
            {title: "Register",comp:"RegisterComp", to:"/register", visible:true},
            {title:"Log In",comp: "LogInComp", to:"/log-in", visible:true},
            {title:"Your Cart",comp: "CartComp", to: "/shopping-cart", value: 0, visible:true},
            {title:"ProductMgm", comp: "CrudProduct", to: "/product-mgm", visible:false}
        ],
    },
    addProductToShoppingList(product) {
        this.state.shoppingList.push(product);
        this.state.navBar[3].value = this.state.shoppingList.length;
    },
    removeProductFromShoppingList(index) {
        this.state.shoppingList.splice(index, 1);
        this.state.navBar[3].value = this.state.shoppingList.length;
    },
    getShoppingList() {
        return this.state.shoppingList;
    },
    destroyShoppingList() {
        this.state.shoppingList = [];
        this.state.navBar[3].value = this.state.shoppingList.length;
        alert("Thank you for your purchase")
    },
    getShoppingListTotal() {
        return this.state.shoppingList.reduce((total, device) => {
            return total + device.price;
        }, 0);
    },
    setUser(user) {
        this.state.user.id = user.id;
        this.state.user.name = user.name;
        this.state.user.email = user.email;
        this.state.user.isAdmin = user.isAdmin;
        this.state.user.purchases = user.purchases;
        this.state.user.isLogged = true;
        this.state.navBar[1].visible = false;
        this.state.user.isAdmin ? this.state.navBar[4].visible = true : this.state.navBar[4].visible = false; 
        this.state.navBar[2].title = user.name;
        this.state.navBar[2].to = "/customer-page";
    },
    getUsers() {
        fetch(`${store.state.BASE_URL}/users`)
        .then(res => res.json())
        .then(users => {
            this.state.registeredUsers = users
            return this.state.registeredUsers; 
        });
    },
    getUserPurchaseHist() {
        fetch(`${store.state.BASE_URL}/users/${this.state.user.id}`)
        .then(res => res.json())
        .then(user => {
            let purchases = [];
                purchases = user.purchases;
                this.state.user.purchases = purchases;
            this.getRecipt();
        });
    },
    addNewUser(user) {
        this.state.registeredUsers.push(user);
        this.setUser(user);
    },
    getDevices(){
        fetch(`${store.state.BASE_URL}/products`)
        .then(res => res.json())
        .then(devices => {
            this.state.devices = devices;
        })
    },
    checkOut() {
        if(this.state.user.isLogged){ 
            this.getUserPurchaseHist();
        }else{
            alert("You must be logged in to check out");
        }
    },
    getRecipt() {
        let recipt = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            total: this.getShoppingListTotal(),
            detail:[] 
        }
        
        let cart = this.state.shoppingList;
        
        for ( let item of cart ) {
            recipt.detail.push({
                qtty: 1,
                product_id: item.id,
                product_name: item.model,
                price: item.price
            })
        }
        this.state.user.purchases.push(recipt);
        this.updateUser(); 
    },
    updateUser() { 
        fetch(`${store.state.BASE_URL}/users/${this.state.user.id}`, {
            method: "PUT",
            body: JSON.stringify(this.state.user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then( ()=> ( this.updateStock()))
        .catch(err => console.log("func updateUser ohoh:",err));

    },
    updateStock() {
        let devices = this.state.devices;
        let cart = this.state.shoppingList;
        let stockChange = false;
        
        for ( let device of devices ) {
            for ( let item of cart ) {
                if (device.id === item.id) {
                    device.stock -= 1;
                    stockChange = true;
                }
            }
            if( stockChange ){
                stockChange = false;
                console.log("func updateStock req", device);
                fetch(`${store.state.BASE_URL}/products/${device.id}`, {
                method: "PUT",
                body: JSON.stringify(device),
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then(res => res.json())
            .catch(err => console.log("func updateStock ohoh:",err));
        }
    }
    this.destroyShoppingList();
}
}
export default store;