import React, { useState } from 'react';
import DatePicker from '../ProvaRicerca/DatePicker';
import moment from "moment";

function SecondaRicerca(){

    const [dates, set_dates] = useState({
        startDate: moment(),
        endDate: null
      });

    const setStartDate = startDate => {
        set_dates({
          ...dates,
          startDate
        });
      };
    
      const setEndDate = endDate => {
        set_dates({
          ...dates,
          endDate
        });
      };

    return(
        <div class="flight-engine">
            <div class="container">
                <div class="tabing">  
                    <div class="tab-content">
                        <div id="1" class="tab1 active">
                           <div class="flight-tab row">
                                <div class="persent-one">
                                    <input type="text" name="dep" class="textboxstyle" id="dep" placeholder="From City or airport"/>
                                </div>
                                <DatePicker
                                    dates={dates}
                                    setStartDate={setStartDate}
                                    setEndDate={setEndDate}
                                    set_dates={set_dates}
                                />
                                <div class="persent-one less-per">
                                    <input type="text" name="dep" class="textboxstyle" id="to-date" placeholder="Returrn"/>
                                </div>
                                <div class="persent-one">
                                    <div class="textboxstyle" id="passenger">01 Passenger</div>
                                </div>
                                <div class="persent-one less-btn">
                                 <input type="Submit" name="submit" value="Search" class="btn btn-info cst-btn" id="srch"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );

}
export default SecondaRicerca;