import React from 'react';
import './App.css';

class App extends React.Component {
  
  constructor() {
    super();
    this.count = 0;
    this.state = {
      title: 'application',
      cars: []
    };
  }

  componentDidMount() {
    const that = this;
    const request = ('http://localhost:3000/cars',{
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    
    fetch(request)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      that.setState({
        cars: data
      });
    });
  }

  addItem(event) {
    this.count+=1;
    const that = this;
    event.preventDefault();
    let car_data = {
      id: this.count,
      car_numbers: this.refs.car_numbers.value,
      car_model: this.refs.car_model.value
    };

    const request = new Request('http://localhost:3000/cars/post', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(car_data)
    });

    let cars = that.state.cars;
    cars.push(car_data);
    that.setState({
      cars
    });

    fetch(request)
    .then(response => {
      response.json();
    })
    .catch(err => {
      console.log(err);
    });
  }

  removeItem(id) {
    this.count-=1;
    const that = this;
    const cars = this.state.cars;
    let car = cars.find(car => {
      return car.id === id;
    });

    const request = new Request('http://localhost:3000/cars/delete/' + id, {
      method: 'DELETE'
    });

    fetch(request)
    .then(response => {
      cars.splice(cars.indexOf(car), 1);
      that.setState({
        cars
      });
      response.json()
      .then(data => {
        console.log(data);
      });
    });
  }

  render() {
    let title = this.state.title;
    let cars = this.state.cars;

    return ( 
      <div className = "App" >
        <h1> {title} </h1> 
          <form ref = "carForm">
            <input type = "text" ref = "car_numbers" placeholder = "numbers" / >
            <input type = "text" ref = "car_model" placeholder = "model" />
            <button onClick = {this.addItem.bind(this)}> Add </button> 
          </form> 
          <ul> 
            {cars.map(car => ( 
              <li key = {car.id}> {car.car_numbers} {car.car_model} {' '} 
                <button onClick = {this.removeItem.bind(this, car.id)}> 
                  {' '}
                  Remove 
                </button>{' '} 
              </li>
              ))}
            </ul> 
      </div>
    );
  }
}

export default App;
