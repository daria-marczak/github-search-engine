class App extends React.Component {
    constructor() {
        super();
        this.state = {
            searchText: "",
            users: []
        };
    }

    onChangeHandle(event) {
        this.setState({ searchText: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        const { searchText } = this.state;
        const url = `https://api.github.com/search/users?q=${searchText}`;
        fetch(url).then(response => response.json()).then(responseJson => this.setState({ users: responseJson.items }));
    }

    render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "form",
                { onSubmit: event => this.onSubmit(event) },
                React.createElement(
                    "label",
                    { htmlFor: "searchText" },
                    "Search by user name"
                ),
                React.createElement("input", {
                    type: "text",
                    id: "searchText",
                    onChange: event => this.onChangeHandle(event),
                    value: this.state.searchText })
            ),
            React.createElement(UsersList, { users: this.state.users })
        );
    }
}

class UsersList extends React.Component {
    get users() {
        return this.props.users.map(user => React.createElement(User, { key: user.id, user: user }));
    }

    render() {
        return React.createElement(
            "div",
            null,
            this.users
        );
    }
}

class User extends React.Component {
    render() {
        return React.createElement(
            "div",
            null,
            React.createElement("img", { src: this.props.user.avatar_url, style: { maxWidth: "100px" } }),
            React.createElement(
                "a",
                { href: this.props.user.html_url, target: "_blank" },
                this.props.user.login
            )
        );
    }
}

ReactDOM.render(React.createElement(App, null), document.getElementById("root"));
