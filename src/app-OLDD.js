import React from 'react';
import ReactDOM from 'react-dom';

// const template = React.createElement('p',{},'testing 123');
// const template = <p>THIS IS JSX FROM WEBPACK</p>
// ReactDom.render(template,document.getElementById('app'));

class IndecisionApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            options : []
        };
        // this.state = {
        //     options : props.options
        // };
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
    }

    componentDidMount(){
        try{
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options){
                this.setState(()=>({options}));
                console.log('fetching data');
            }

        }catch(e){
            //Do nothing at all
        }

    }

    componentDidUpdate(prevProps,prevState){
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options',json)
        }
    }

    componentWillUnmount(){
        console.log('componentWillUnmount');
    }
    handleDeleteOption(optionToRemove){
        this.setState((prevState) => ({
            options : prevState.options.filter((option)=> optionToRemove !== option)
        }));
    }
    handleDeleteOptions (){

        this.setState(() => ({
            options: []
        }))

    }

    handlePick (){
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);

    }

    handleAddOption (option){
        if(!option){
            return 'Enter valid value to add item'
        }else if(this.state.options.indexOf(option) > -1){
            return 'This option already exists'
        }
        this.setState((prevState)=>({
            options: prevState.options.concat([option])
        }));
        console.log(option);
    }
    render(){
        const title = 'Indecision';
        const subtitle = 'Put Your life in the hands of a computer';
        //const options = ['Thing One','Thing Two','Thing Four'];
        return(
            <div>
                <Header title="Test Value" subtitle={subtitle}/>
                <Header title={title}/>
                <Action hasOptions={this.state.options.length >  0} handlePick={this.handlePick}/>

                <Options
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption = {this.handleDeleteOption}
                    options={this.state.options}/>
                <AddOption handleAddOption={this.handleAddOption}/>
            </div>
        )
    }
}

const Header = (props) => {
    return(
        <div>
            <h1>Indecision</h1>
            <h2>Put your life in the hands of a computer</h2>
            <h3>{props.title}</h3>
        </div>
    );
};

Header.defaultProps ={
    title: 'Indecision'
};

const Action = (props) => {
    return(
        <div>
            <button disabled={!props.hasOptions} onClick={props.handlePick}>What should i do?</button>
        </div>
    )
};

const Options = (props) => {
    return(
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {props.options.length === 0 && <p>Please add an option to get started!</p>}
            {
                props.options.map((option) => (
                    <Option
                        key={option}
                        optionText={option}
                        handleDeleteOption={props.handleDeleteOption}
                    />
                ))
            }
        </div>
    )
};

const Option =(props) => {

    return(
        <div>
            {props.optionText}
            <button
                onClick={(e) => {
                    props.handleDeleteOption(props.optionText)
                }}
            >Remove</button>
        </div>
    )
};

class AddOption extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: undefined
        };
        this.handleAddOption = this.handleAddOption.bind(this);
    }
    handleAddOption(e){
        //we dont have access to the const defined in the IndecisionApp class since we lost the bind in order to fix it we will pass to the handleAddOption with bind the 'this'
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        this.setState(() => ({ error }));
        if(!error){
            e.target.elements.option.value = '';
        }
    }
    render(){
        return(
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" id="option"/>
                    <button>Add Option</button>
                </form>
            </div>
        )
    }
}

const User = (props) => {
    return (
        <div>
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
        </div>
    )
}

ReactDOM.render(<IndecisionApp/>,document.getElementById('app'));