import { createStore } from 'vuex'
import { ItemShop } from "../interface/ShopItem";
import ItemInventory from "../interface/itemInventary";

export default createStore({
  state: {
    listShopItem: [
      {
        id: 1,
        name: "Хлеб",
        listPrice: [10,0,0,0,0,0,0,0] as Array<number>,
      },
      {
        id: 2,
        name: "Молоко",
        listPrice: [5,0,0,0,0,0,0,0] as Array<number>,
      },
      {
        id: 3,
        name: "Сыр",
        listPrice: [15,0,0,0,0,0,0,0] as Array<number>,
      },
      {
        id: 4,
        name: "Макароны",
        listPrice: [3,0,0,0,0,0,0,0] as Array<number>,
      },
      {
        id: 5,
        name: "Курица",
        listPrice: [100,0,0,0,0,0,0,0] as Array<number>,
      },
    ] as Array<ItemShop>,
    Inventary: [{
        id: 1,
        name: "",
        price: 0,
        count: 0,
      },{
        id: 2,
        name: "",
        price: 0,
        count: 0,
      },{
        id: 3,
        name: "",
        price: 0,
        count: 0,
      },{
        id: 4,
        name: "",
        price: 0,
        count: 0,
      },
    ] as Array<ItemInventory>,
    balance: 100,
  },
  getters: {
    getListShopItem: state => state.listShopItem,
    getInventory: state => state.Inventary,
    getBalance: state => state.balance,
    getLastPrice: () => (ar: Array<number>) : number => {
      for (let i = ar.length-1; i >= 0; i--) {
        if (ar[i] !== 0)
          return ar[i];
      }
      return -1;
    }
  },
  mutations: {
    setListShopItem(state, payload) {
      state.listShopItem = payload;
    },
    setInventory(state, inventList) {
      state.Inventary = inventList;
    },
    setBalance(state, balance) {
      state.balance = balance;
    }
  },
  actions: {
    async addProduct({commit, getters}, object: ItemShop) {
      const inventory = await getters.getInventory;
      let balance = await getters.getBalance;

      const idx = inventory.findIndex((item: ItemInventory) => item.name === object.name);

      const price = getters.getLastPrice(object.listPrice);
      console.log(price);

      if (idx !== -1) {
        if (balance - price >= 0) {
          inventory[idx].count++;
          inventory[idx].price = price;
          balance -= price;
        } else {
          return "No money";
        }
      } else {
        const idxEmpty = inventory.findIndex((item: ItemInventory) => item.name === "");

        if (idxEmpty === -1) {
          return "No empty place";
        } else {
          if (balance - price >= 0) {
            inventory[idxEmpty].price = price;
            inventory[idxEmpty].count++;
            inventory[idxEmpty].name = object.name;
            balance -= price;
          } else {
            return "No money";
          }
        }
      }
      commit('setInventory', inventory);
      commit('setBalance', balance);
      return true;
    },
    sellProduct({commit, getters}, object) {
      const inventary = getters.getInventory;
      const listShopItem = getters.getListShopItem;

      let balance = getters.getBalance;

      const idShop = listShopItem.findIndex((el : ItemShop) => el.name === object.name);
      const idInven = inventary.findIndex((el:ItemInventory) => el.id === object.id);

      const lastPrice = getters.getLastPrice(listShopItem[idShop].listPrice)
      balance += lastPrice;

      if (inventary[idInven].count - 1 > 0) {
        inventary[idInven].count--;
      } else {
        inventary[idInven].count = 0;
        inventary[idInven].name = "";
        inventary[idInven].price = 0;
      }

      commit('setInventory', inventary);
      commit('setBalance', balance);
    },
    modifyShopList({commit, getters}) {
      const randomInt = (min: number, max: number) => Math.round(min - 0.5 + Math.random() * (max - min + 1));


      const shopList = getters.getListShopItem;

      shopList.forEach((shop: ItemShop) => {
        const idx = shop.listPrice.indexOf(0);
        if (idx === -1) {
          shop.listPrice.shift();
        }

        const Ind = idx === -1 ? shop.listPrice.length-1 : idx
        const prevIdx = shop.listPrice[Ind - 1] - 10 <= 0 ? 1 : shop.listPrice[Ind - 1] - 10;
        const nextIdx = shop.listPrice[Ind - 1] + 10;
        if (idx === -1) {
          shop.listPrice.push(randomInt(prevIdx, nextIdx));
        } else {
          shop.listPrice[idx] = randomInt(prevIdx, nextIdx);
        }
      });

      commit("setListShopItem", shopList);
    }
  },
  modules: {
  }
})
