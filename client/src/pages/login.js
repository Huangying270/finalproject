import React, { Component } from "react";
import { Input, FormBtn } from "../Components/Form";


class login extends Component {
    state = {
        email: " ",
        login: " ",
        password: " "
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
    }

    render() {
        return (
            <form>
                <Input
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    name="email"
                    placeholder="email (required)"
                />
                <Input
                    value={this.state.login}
                    onChange={this.handleInputChange}
                    name="username"
                    placeholder="username (required)"
                />
                <Input
                    type="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    name="password"
                    placeholder="password (required)"
                />
                <FormBtn
                    disabled={!(this.state.login && this.state.password)}
                    onClick={this.handleFormSubmit}
                >Login</FormBtn>

            </form>
        )
    }

};

export default login;