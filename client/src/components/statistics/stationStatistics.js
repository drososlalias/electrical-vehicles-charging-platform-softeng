import React from 'react';
import {Link , Redirect} from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getStationOwnerStatistics} from "../../actions/auth";
import {Table} from "react-bootstrap";
import './style/style.css';
import {Bar , Line , Doughnut, Polar} from 'react-chartjs-2';
const StationStatistics = ( { getStationOwnerStatistics , stationStatistics : {stationStatistics}}) => {
    if(!stationStatistics){
        return <Redirect to='/station_owner_profile'/>
    }



     function  randomColorGenerator(){ 
        return '#' + (Math.random().toString(16) + '0000000').slice(2, 8); 
    };

    let colors  = []
    let points = [];
    let pointsEnergy = [];
    return (
        <div className='container-table'>
            <Table className='table1' striped bordered hover>
                <tbody>
                <th colSpan='2'><strong>Requested Information</strong></th>
                <tr><td>Station Id </td> <td> { stationStatistics && stationStatistics.StationId}</td></tr>
                <tr><td>Operator  </td><td> { stationStatistics && stationStatistics.Operator}</td></tr>
                <tr><td>Requested Timestamp </td> <td>{ stationStatistics && stationStatistics.RequestedTimestamp}</td></tr>
                <tr><td>Period From </td>  <td>{stationStatistics && stationStatistics.PeriodFrom}</td></tr>
                <tr><td>Period To  </td><td>{stationStatistics && stationStatistics.PeriodTo}</td></tr>
                <tr><td>Total Energy Delivered  </td><td>{stationStatistics && stationStatistics.TotalEnergyDelivered}</td></tr>
                <tr><td>Number of Charging Sessions  </td><td> {stationStatistics && stationStatistics.NumberOfChargingSessions}</td></tr>
                <tr><td>Number of Active Points  </td><td> {stationStatistics && stationStatistics.NumberOfActivePoints}</td></tr>
                </tbody>
                {stationStatistics && Object.keys(stationStatistics.SessionSummaryList).map( (item, index) => {
                        return (points.push("Id: " + stationStatistics.SessionSummaryList[index].PointId) , pointsEnergy.push(stationStatistics.SessionSummaryList[index].EnergyDelivered),colors.push(randomColorGenerator()),
                                <tbody>
                                <tr>
                                    <td><strong> Session {index + 1} Info </strong></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Point Id</td>
                                    <td> {stationStatistics.SessionSummaryList[index].PointId} </td>
                                </tr>
                                <tr>
                                    <td>Point Sessions</td>
                                    <td>{stationStatistics.SessionSummaryList[index].PointSessions} </td>
                                </tr>
                                <tr>
                                    <td>Energy Delivered</td>
                                    <td>{stationStatistics.SessionSummaryList[index].EnergyDelivered} </td>
                                </tr>
                                </tbody>
                        )
                    }
                )
            }

           
            </Table> <br/>
            <div className='chart' >
                <Bar data={{
                    labels: points,
                    datasets: [
                        {
                            label: 'Energy Per Point Bar Diagram',
                            data : pointsEnergy,
                            backgroundColor:  colors ,
                            borderColor : 'blue',
                            borderWidth :  1           ,
                            hoverBackgroundColor: randomColorGenerator()    
                        
                        }
                    ],

                }}
                     options={{}}
                />
            </div>
            
            <div className='chart'  >
                <Doughnut data={{
                    labels: points,
                    datasets: [
                        {
                            label: 'Energy Per Point Doughnut Diagram',
                            data : pointsEnergy,
                            backgroundColor:  colors ,
                            borderColor : 'blue',
                            borderWidth :  1           ,
                            hoverBackgroundColor: randomColorGenerator()    
                        
                        }
                    ],

                }}
                     options={{}}
                />
            </div>
            
            <div className='chart'  >
                <Polar data={{
                    labels: points,
                    datasets: [
                        {
                            label: 'Energy Per Point Polar Area Diagram',
                            data : pointsEnergy,
                            backgroundColor:  colors ,
                            borderColor : 'blue',
                            borderWidth :  1           ,
                            hoverBackgroundColor: randomColorGenerator()                
                        }
                    ],
                }
        }               
                     options={{}}
                />
            </div>
            
            <div className='chart' >
                <Line data={{
                    labels: points,
                    datasets: [
                        {
                            label: 'Energy Per Point Line Diagram',
                            data : pointsEnergy,
                            borderColor : randomColorGenerator(),
                            borderWidth :  5  ,
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
StationStatistics.propTypes = {
    getStationOwnerStatistics : PropTypes.func.isRequired,
    stationStatistics: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    stationStatistics : state.stationStatistics

})


export default connect(mapStateToProps , {getStationOwnerStatistics})(StationStatistics)

