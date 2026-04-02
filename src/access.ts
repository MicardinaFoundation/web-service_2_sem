export default function access(initialState: any){
    const {currentUser} = initialState || {};
    const token = localStorage.getItem('token');


    return {
        isAdmin: currentUser?.role === 'admin',
        isUser: !!currentUser,
        isAuth: !!token,
    }
}