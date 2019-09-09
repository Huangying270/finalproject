import React, { Component } from "react";
import { Container, Row, Col } from "../Components/Grid";
import { List, ListItem } from "../Components/List";
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; import DeleteBtn from "../Components/DeleteBtn";
import API from "../utils/API";
import AddFoodBtn from "../Components/AddFoodBtn";
import "./myfridge.css";
import moment from "moment";
import axios from "axios";

class myfridge extends Component {

    state = {
        foods: [],
        name: " ",
        expiration: " "
    }

    componentDidMount() {
        this.loadFoods();
        this.checkExpiration();
      }

    loadFoods = () => {
        API.getFoods()
            .then(res => {
                console.log("Get foods");
                console.log(res);
                this.setState({ foods: res.data, name: "", expiration: "" })
            }
            )
            .catch(err => console.log(err));
    };

    deleteFood = id => {
        API.deleteFood(id)
            .then(res => this.loadFoods())
            .catch(err => console.log(err));
    };

    checkExpiration = (expirationDate) => {
        console.log("MOMENT JS");
        var isExpired = moment(new Date(), 'DD/MM/YYYY').isBefore(expirationDate, 'DD/MM/YYYY');
        var expiredClass = "";
        console.log(isExpired);

        if(!isExpired) {
            if(moment(new Date(), 'DD/MM/YYYY').subtract(2, 'days')) {
                expiredClass = "warning";
            }
        } else {
            expiredClass = "expired";
        }
        return expiredClass;
        // var twoDaysBefore = moment().subtract(2, 'days');
        // console.log(twoDaysBefore);
        // if ()


        // console.log(moment(new Date(), 'DD/MM/YYYY').isBefore(this.state.expiration, 'DD/MM/YYYY'));
        // console.log(this.state.name, format(new Date(this.state.expiration), 'MM/dd/yyyy'), this.state.expiration);
        // console.log(moment(new Date(), 'DD/MM/YYYY').isBefore(this.state.expiration, 'DD/MM/YYYY'));


    }

    render() {
        return (
            <div className="outer-fridge">
                <h3 className="title-style">Your Fridge</h3>
                    {this.state.foods.length ? (
                        <List>
                            {this.state.foods.map(food => (
                                <ListItem key={food._id}>
                                    <span className={this.checkExpiration(food.expirationDate, "MM/DD/YYYY")}>
                                    {food.foodItem}</span>
                                    <button onClick={() =>this.deleteFood(food._id)}>X</button>
                                    {/* <DeleteBtn onClick={this.deleteFood(food._id)} /> */}
                                    
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3>Your fridge is empty!</h3>
                                            <ul id="fridge-foods"></ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    )}
                <Link to="/camera" >
                    <div className="button">
                        <AddFoodBtn />
                    </div>
                </Link>
            </div>
        )
    }
}

//here deletething

export default myfridge;