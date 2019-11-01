const INITIAL_STATE = {
    userid: null ,
    name:  null ,
    image : null ,
    email : null ,
    phno : null ,
    companyInfo : {}
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'USERINFO':
            return ({
                ...state,
                userid : action.payload.id || 'ID not Found' ,
                name   : action.payload.name || 'Name not Found',
                image  : action.payload.image || 'Image Not Found' ,
                email : action.payload.email || 'Email not found' ,
                phno : action.payload.phno || 'Number not found' 
            })

            case 'COMPANYINFO' :
            return ({
                ...state,
                 companyInfo : action.payload
            })
            
        default:
         return state;
    }

}