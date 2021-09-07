import React, {Fragment, useEffect, useState} from 'react';
import {Link , Redirect} from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getUserStatistics} from "../../actions/auth";
import {Table} from "react-bootstrap";
import './style/style.css';
import {Bar , Polar , Doughnut , Line} from "react-chartjs-2";
const Statistics = ( { getUserStatistics , statistics : {statistics} , formData }) => {
    if(!statistics){
       return <Redirect to='/user_profile'/>
    }

    
    function  randomColorGenerator(){ 
        return '#' + (Math.random().toString(16) + '0000000').slice(2, 8); 
    };

    let colors  = []
    let money = [];
    let session = [];
    

        return (
        <div className='container-table'>
            <Table className='table1' striped bordered hover>
                <tbody>
                    <th colSpan='2'><strong>Requested Information</strong></th>
                    <tr><td>Vehicle Id </td> <td> { statistics && statistics.VehicleId}</td></tr>
                    <tr><td>Requested Timestamp</td>  <td>{ statistics && statistics.RequestedTimestamp}</td></tr>
                    <tr><td>Period To </td>  <td>{statistics && statistics.PeriodTo}</td></tr>
                    <tr><td>Total Energy Consumed</td> <td>{statistics && statistics.TotalEnergyConsumed}</td></tr>
                    <tr><td>Number of Visited Points</td> <td> {statistics && statistics.NumberOfVisitedPoints}</td></tr>
                    <tr><td>Number of Sessions  </td><td> {statistics && statistics.NumberOfVehicleChargingSessions}</td></tr>
                </tbody>
                    {statistics && Object.keys(statistics.VehicleChargingSessionSummaryList).map( (item, index) => {
                    return(
                        session.push("Id: " + statistics.VehicleChargingSessionSummaryList[index].SessionID) , money.push(statistics.VehicleChargingSessionSummaryList[index].SessionCost),colors.push(randomColorGenerator()),
                        <tbody>
                        <tr> <td><strong> Session {index+1} Info  </strong> </td><td>  </td> </tr>
                        <tr> <td>Session Index </td><td> {statistics.VehicleChargingSessionSummaryList[index].SessionIndex} </td> </tr>
                        <tr> <td>Session Id  </td><td>{statistics.VehicleChargingSessionSummaryList[index].SessionID} </td></tr>
                        <tr> <td>Energy Provider  </td><td>{statistics.VehicleChargingSessionSummaryList[index].EnergyProvider} </td></tr>
                        <tr> <td>Started On:  </td><td>{statistics.VehicleChargingSessionSummaryList[index].StartedOn} </td></tr>
                        <tr> <td> Finished On  </td><td>{statistics.VehicleChargingSessionSummaryList[index].FinishedOn} </td></tr>
                        <tr><td>Energy Delivered   </td><td> {statistics.VehicleChargingSessionSummaryList[index].EnergyDelivered}</td> </tr>
                        <tr><td>Payment  </td><td>{statistics.VehicleChargingSessionSummaryList[index].Payment} </td></tr>
                        <tr> <td>Cost per KWh  </td><td>{statistics.VehicleChargingSessionSummaryList[index].CostPerKwh}</td></tr>
                        <tr> <td>Session Cost </td><td> {statistics.VehicleChargingSessionSummaryList[index].SessionCost}</td></tr>
                        </tbody>
                )})}
        </Table>
        <br/>
            <div className='chart'>
                <Bar data={{
                    labels: session,
                    datasets: [
                        {
                            label: 'Money Spent Per Session Diagram',
                            data : money,
                            backgroundColor:  colors ,
                            borderColor : 'blue',
                            borderWidth :  1           ,
                            hoverBackgroundColor: randomColorGenerator(),
                            barThickness : 60    
                    
                        
                        }
                    ],

                }}
                     options={{}}
                />
            </div>
            <div className='chart'>
                <Doughnut data={{
                    labels: session,
                    datasets: [
                        {
                            label: 'Money Spent Per Session Pie Diagram',
                            data : money,
                            backgroundColor:  colors ,
                            borderColor : 'blue',
                            borderWidth :  1           ,
                            hoverBackgroundColor: randomColorGenerator(),
                             
                    
                        
                        }
                    ],

                }}
                     options={{}}
                />
            </div>
            <div className='chart'>
                <Polar data={{
                    labels: session,
                    datasets: [
                        {
                            label: 'Money Spent Per Session Polar Diagram',
                            data : money,
                            backgroundColor:  colors ,
                            borderColor : 'blue',
                            borderWidth :  1           ,
                            hoverBackgroundColor: randomColorGenerator(),
                            
                    
                        
                        }
                    ],

                }}
                     options={{}}
                />
            </div>
            <div className='chart'>
                <Line data={{
                    labels: session,
                    datasets: [
                        {
                            label: 'Money Spent Per Session Bar Diagram',
                            data : money,
                            backgroundColor:  colors ,
                            borderColor : randomColorGenerator(),
                            borderWidth :  5           ,
                            hoverBackgroundColor: randomColorGenerator(),
                            fill : '-1' 
                    
                        
                        }
                    ],

                }}
                     options={{}}
                />
            </div>
           
            

        </div>

        )
    }
Statistics.propTypes = {
    getUserStatistics : PropTypes.func.isRequired,
    statistics: PropTypes.object.isRequired,
    formData : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    statistics : state.statistics,
    formData : state.statistics.formData

})


export default connect(mapStateToProps , {getUserStatistics})(Statistics)

