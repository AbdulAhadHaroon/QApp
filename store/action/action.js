export function UserDetail(uinfo) {
    return dispatch => {
        dispatch({ type: 'USERINFO', payload: uinfo  })
    }
}

export function CompanyDetail(cinfo) {
    return dispatch => {
        dispatch({ type: 'COMPANYINFO', payload: cinfo  })
    }
}