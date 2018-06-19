import * as React from 'react';
import toastr from 'toastr'

export default  class ToastrMsg extends React.Component {
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
               "preventDuplicates": true,
               "positionClass": "toast-top-center",
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





