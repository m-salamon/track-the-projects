import React, { Component, Fragment } from "react";
import toastr from 'toastr'

export default  class ToastrMsg extends Component {
     constructor() {
          super();
          this.state = {
               type: '',
               title: '',
               msg: ''
          }
     }

     toastrMsg = (type, title, msg) => {
          toastr.options = {
               "closeButton": true,
               "newestOnTop": true,
               "progressBar": false,
               "preventDuplicates": false,
               "newestOnTop": false,
               "positionClass": "toast-bottom-right",
               "timeOut": "3000",
               "hideEasing": "linear",
               "showMethod": "fadeIn",
               "hideMethod": "fadeOut"
          }
          toastr[type](/*title,*/ msg)
     }
 
     componentDidMount(){
          this.toastrMsg(this.props.type, this.props.title, this.props.msg)
     }

     render(){
          return(
               null
          )
     }
}





