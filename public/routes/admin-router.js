const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')
// const Dashboard = require('./dashboard')

const mongoose=require('mongoose')

AdminBro.registerAdapter(AdminBroMongoose)

const UserSchema = require('../models/userschema')
var ProductsSchema = require('../models/product')
var OrderSchema = require('../models/orders')

var Member = mongoose.model("Member", UserSchema);
var Product = mongoose.model("Product", ProductsSchema);
var Order = mongoose.model("Order", OrderSchema)

const ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@grocery.com',
  password: process.env.ADMIN_PASSWORD || 'grocerypass',
}

const AdminBroOptions = {
  resources: [{
    resource: Member,
    options: {
      parent:{
        name: 'User Content',
        icon: 'fa fa-user'
      }
    }
  },{
    resource:Order,
    options:{
      parent:{
        name:'User Content'
      }
    }
  }, Product],
  dashboard: {
    render:{
      show:(property, resource,helpers)=>{
        const html=
        abcd

        return html
      }
    }
  },
  databases:[mongoose],
  dashboard: {
    handler: async () => {
      // dashboard:{
      //   isVisible:{show:true},
      // render:{
      //   show:{()=>{
      //     const html=
      //     <div>
      //       this is dashboard page
      //     </div>
      //     return html
      //   }
          
      //   }
      // }}
    },
    component: AdminBro.bundle('../../dashboard.jsx')
  },
  rootpath:'/admin',
  branding:{
    logo:'https://i.pinimg.com/originals/5d/26/a1/5d26a173f443cbd190e34481438d474b.png',
    companyName: 'Grocery-Mart-Admin'
  }
}


const adminBro = new AdminBro(AdminBroOptions)
// const router = AdminBroExpress.buildRouter(adminBro)

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro,{
  cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
  cookiePassword: process.env.ADMIN_COOKIE_PASS || 'coz-i-can-not-decide-a-super-long-password',
  authenticate: async(email, password) =>{
    if(email === ADMIN.email && password === ADMIN.password){
      return ADMIN
    }
    return null
  }
})

module.exports = router
