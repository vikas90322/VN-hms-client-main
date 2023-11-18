import React from "react";


const Tablerow2 = ({rows, handleRowChange}) => {
  return (
    <>
      <div className="table-section_4">
                  <table>
                    <thead>
                      <tr>
                        <th>TEST PARAMETER</th>
                        <th>RESULT</th>
                        <th>UNITS</th>
                        <th>BIOLOGICAL REF,INTERVAL</th>
                        <th colSpan="3">ACT</th>
                      </tr>
                    </thead>
                    <tbody>
                        
                      <tr>
                        <td className="left-align_4">
                          Red Blood Cell Count (RBC)
                        </td>
                        <td colSpan="1">
                        <td>5.5</td>
                        </td>
                        <td>cells/L</td>
                        <td>4.5 - 5.5 x 10^12</td>
                        <td colSpan="3">
                          <a href="#a">Range</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="left-align_4">Hemoglobin (Hb)</td>
                        <td colSpan="1">
                         14
                        </td>
                        <td>g/dL</td>
                        <td>
                          Men: 13.8 - 17.2 g/dL
                          <br />
                          Women: 12.1 - 15.1 g/dL
                        </td>
                        <td colSpan="3">
                          <a href="#a">Range</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="left-align_4">Hematocrit (Hct)</td>
                        <td colSpan="1">
                          44
                        </td>
                        <td>%</td>
                        <td>
                          Men: 38.8% - 50.0%
                          <br />
                          Women: 34.9% - 44.5%
                        </td>
                        <td colSpan="3">
                          <a href="#a">Range</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="left-align_4">
                          Mean Corpuscular Volume (MCV)
                        </td>
                        <td colSpan="1">
                          90
                        </td>
                        <td>fL (femtoliters)</td>
                        <td>80 - 100</td>
                        <td colSpan="3">
                          <a href="#a">Range</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="left-align_4">
                          Mean Corpuscular Hemoglobin (MCH)
                        </td>
                        <td colSpan="1">
                          30
                        </td>
                        <td>pg (picograms)</td>
                        <td>27 - 33</td>
                        <td colSpan="3">
                          <a href="#a">Range</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="left-align_4">
                          Mean Corpuscular Hemoglobin Concentration (MCHC)
                        </td>
                        <td colSpan="1">
                          33.5
                        </td>
                        <td>g/dL</td>
                        <td>32 - 36</td>
                        <td colSpan="3">
                          <a href="#a">Range</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="left-align_4">
                          Red Cell Distribution Width (RDW)
                        </td>
                        <td colSpan="1">
                          13
                        </td>
                        <td>%</td>
                        <td>11.5% - 14.5%</td>
                        <td colSpan="3">
                          <a href="#a">Range</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="left-align_4">Platelet Count (PLT)</td>
                        <td colSpan="1">
                          280 x 10^9
                        </td>
                        <td>cells/L</td>
                        <td>150 - 450 x 10^9</td>
                        <td colSpan="3">
                          <a href="#a">Range</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="left-align_4">
                          Mean Platelet Volume (MPV)
                        </td>
                        <td colSpan="1">
                          8.5
                        </td>
                        <td>fL</td>
                        <td>7.4 - 10.4</td>
                        <td colSpan="3">
                          <a href="#a">Range</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="left-align_4">Neutrophil Count</td>
                        <td colSpan="1">
                          4 x 10^9
                        </td>
                        <td>cells/L</td>
                        <td>2.0 - 7.5 x 10^9</td>
                        <td colSpan="3">
                          <a href="#a">Range</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="left-align_4">Lymphocyte Count</td>
                        <td colSpan="1">
                          2.5 x 10^9
                        </td>
                        <td>cells/L</td>
                        <td>1.0 - 3.5 x 10^9</td>
                        <td colSpan="3">
                          <a href="#a">Range</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="left-align_4">Monocyte Count</td>
                        <td colSpan="1">
                          0.8 x 10^9
                        </td>
                        <td>cells/L</td>
                        <td>0.2 - 1.0 x 10^9</td>
                        <td colSpan="3">
                          <a href="#a">Range</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="left-align_4">Eosionophil Count</td>
                        <td colSpan="1">
                          0.3 x 10^9
                        </td>
                        <td>cells/L</td>
                        <td>0.02 - 0.5 x 10^9</td>
                        <td colSpan="3">
                          <a href="#a">Range</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="left-align_4">Basophil Count</td>
                        <td colSpan="1">
                          0.08 x 10^9
                        </td>
                        <td>cells/L</td>
                        <td>0.02 - 0.1 x 10^9</td>
                        <td colSpan="3">
                          <a href="#a">Range</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
    </>
  );
};

export default Tablerow2;