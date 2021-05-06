import React from 'react';
import { Table, TBody, TD, TR, Img } from 'oy-vey';
import { sitename, url } from '../../../config';
import EmptySpace from '../modules/EmptySpace';


const SubFooter = (props) => {

  const spaceStyle = {
    paddingBottom: '0',
    paddingLeft: '0',
    color: '#fff',
    fontSize: '14px',
    textAlign: 'center',
    backgroundColor: '#17222e'
  };

  const spabeBgFooter = {
    backgroundColor: '#17222e',
    paddingBottom: '30px',
    paddingLeft: '0',
    color: '#fff',
    fontSize: '14px',
    textAlign: 'center'
  }



  return (
    <Table width="100%">
      <TBody>
        <TR>
          <TD style={{ color: props.color, fontFamily: 'Arial', fontSize: '28px', textAlign: 'center', backgroundColor: '#17222e', paddingTop: '30px', paddingBottom: '30px' }}>
            <div>
              <a href={url}>
                <Img src={url + "/email/logo.png"} width={150} alt={sitename} />
              </a>
              <div style={spaceStyle}>© {(new Date()).getFullYear()} {sitename}. All rights reserved.</div>
              <div style={spabeBgFooter}>{sitename} AB, 559264-3885 </div>
            </div>
          </TD>
        </TR>
      </TBody>
    </Table>
  );
};

export default SubFooter;