import {Component, React} from 'react';

export default class HomeClass extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            job: '',
            name: '',
            target: '',
            jobList: [],
            nameList: [],
            details: [],
            finalDetails: [],
            result: [],
            colTotal: []
        }
    }

    handleId = (e) => {
        this.setState({
            id: e.target.value,
            finalDetails: [],
            colTotal: []
        })
    }

    handleJob = (e) => {
        this.setState({
            job: e.target.value,
            finalDetails: [],
            colTotal: []
        })
    }

    handleName = (e) => {
        this.setState({
            name: e.target.value,
            finalDetails: [],
            colTotal: []
        })
    }

    handleTarget = (e) => {
        this.setState({
            target: e.target.value,
            finalDetails: [],
            colTotal: []
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let tempNames = this.state.nameList;
        if(tempNames.includes(this.state.name) === false) {
            tempNames.push(this.state.name);
            this.setState({nameList: tempNames});
        }

        let tempJobs = this.state.jobList;
        if(tempJobs.includes(this.state.job) === false) {
            tempJobs.push(this.state.job);
            this.setState({jobList: tempJobs});
        }

        var cnt = 0;
        this.state.details.forEach(e => {
            var tempTarget = 0;
            if(e.job === this.state.job && e.name === this.state.name) {
                tempTarget = Number(this.state.target) + Number(e.target);
                e.target = tempTarget;
                cnt = 1;
            }
        })

        if(this.state.details.length === 0 || cnt === 0){
            let tempDetails = this.state.details;
            tempDetails.push({'id': this.state.id, 'job': this.state.job, 'name': this.state.name, 'target': this.state.target});
            this.setState({details: tempDetails});
        }

        this.state.jobList.forEach(e1 => {
            let tempFinalDetails = [];
            var sum = 0;
            tempFinalDetails.push(e1);
            this.state.nameList.forEach(e2 => {
                var cnt = 0;
                this.state.details.forEach(e3 => {
                    if(e3.job === e1 && e3.name === e2) {
                        tempFinalDetails.push(e3.target);
                        cnt = 1;
                        sum = Number(sum) + Number(e3.target);
                    }
                });
                if(cnt === 0) {
                    tempFinalDetails.push(0);
                }
            });
            tempFinalDetails.push(sum);
            let x = this.state.finalDetails;
            x.push(tempFinalDetails);
            this.setState({finalDetails: x})
        });

        this.setState({
            finalDetails: this.state.finalDetails.filter((e) => e.length > this.state.nameList.length+1)
        });

        this.setState({
            result: this.state.finalDetails
        })

        for (let index = 0; index < this.state.nameList.length; index++) {
            // console.log(this.getSumColumn(this.state.finalDetails, index+1))
            let x = this.state.colTotal;
            x.push(this.getSumColumn(this.state.finalDetails, index+1));
            this.setState({colTotal: x})
        }

    }

    getSumColumn = (arr, column) => {
        let sum = 0
        arr.forEach(el => sum += Number(el[column]))
        return sum
    }

    render(){
        var rows = this.state.result.map(function (item, i){
            var entry = item.map(function (element, j) {
                if(isNaN(element)) {
                    return (
                        <td key={j} style = {{fontWeight: "bold"}}> {element} </td>
                    )
                }else {
                    return (
                        <td key={j}> {element} </td>
                    )
                }
                // return ( 
                //     <td key={j}> {element} </td>
                //     );
            });
            return (
                <tr key={i}> {entry} </tr>
             );
        });
        return(
            <div className='container'>
                <div style={{border: "2px solid black" , width: "fit-content", borderRadius: "5px", margin: "auto"}}>
                    <form onSubmit={this.handleSubmit}>
                        <br/>
                        <label>Enter Id:</label>
                        <input type="text" value={this.state.id} onChange={this.handleId}/>
                        <br/>
                        <br/>
                        <label>Enter Job:</label>
                        <input type="text" value={this.state.job} onChange={this.handleJob}/>
                        <br/>
                        <br/>
                        <label>Enter Name:</label>
                        <input type="text" value={this.state.name} onChange={this.handleName}/>
                        <br/>
                        <br/>
                        <label>Enter Target:</label>
                        <input type="text" value={this.state.target} onChange={this.handleTarget}/>
                        <br/>
                        <br/>
                        <button type='submit' className='btn btn-secondary'>Add</button>
                        <br/>
                    </form>
                </div>
                <br/>
                {this.state.result.length > 0 &&
                    <div style={{width: "fit-content", margin: "auto"}}>
                        <table className="table table-bordered table-hover table-dark table-striped">
                            <tr>
                                <th>Job/Name</th>
                                {this.state.nameList.map((d, i) => (
                                    <th>{d}</th>
                                ))}
                                <th>Total</th>
                            </tr>
                            {rows}
                            <tr>
                                <td style = {{fontWeight: "bold"}}>Total</td>
                                {this.state.colTotal.map((d, i) => 
                                    <td>{d}</td>
                                )}
                            </tr>
                        </table>
                    </div>
                }
            </div>
        )
    }
}