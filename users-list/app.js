
/****** Function to make request *******
USAGE: 
request('get', 'http://exmaple.com', (resp)=> {console.log(resp)} );
*/

var request = function() {
    var xhr = new XMLHttpRequest();
    return function( method, url, callback ) {
        xhr.onload = function() {
            callback( JSON.parse(xhr.responseText));
        };
        xhr.open( method, url );
        xhr.send();
    };
}();
class Users{
    static BASE_URL = 'https://jsonplaceholder.typicode.com';
    static USERS_PATH = '/users';
    static POSTS_PATH = '/posts';
    static USER_ROW_TEMPLATE = document.getElementById('userTemplate').innerHTML;

    constructor(container){
        this.container = container;
        this.init();
    }

    init(){
        this.onBodyClick = this.onBodyClick.bind(this);
        this.renderUsers = this.renderUsers.bind(this);

        this.tbody = this.container.getElementsByTagName('tbody')[0];
        this.tbody.addEventListener('click', this.onBodyClick)
        this.fetchUsers();
    }

    onBodyClick(e){
        const id = e.target.parentNode.dataset.userId;

        this.fetchUserPosts(id);
    }

    fetchUsers(){
        request('get', Users.BASE_URL + Users.USERS_PATH, this.renderUsers)
    }

    renderUsers(usersList){
        this.tbody.innerHTML = usersList.map((user) => {
            return Users.USER_ROW_TEMPLATE
                .replace('{{id}}', user.id)
                .replace('{{name}}', user.name)
                .replace('{{phone}}', user.phone)
                .replace('{{email}}', user.email)
        }).join('\n');
    }

    fetchUserPosts(userId){
        const url = Users.BASE_URL + Users.POSTS_PATH + '?userId=' + userId;
        request('get', url, this.renderUserPosts)
    }

    renderUserPosts(posts){
        console.log(posts);
    }

}

const usersList = new Users(
    document.getElementById('usersListTable')
)