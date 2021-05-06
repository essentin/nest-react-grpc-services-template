import React from 'react';
import PropTypes from 'prop-types';
import { Img, Table, TBody, TD, TR } from 'oy-vey';
import { sitename, url } from '../../../config';

const Header = (props) => {
  const style = {
    color: props.color,
    fontWeight: 'bold',
    backgroundColor: '#222d3a',
    width: '100%'
  };

  return (
    <Table width="100%"  style={style} color={props.color} >
      <TBody>
        <TR>
          <TD>
            <Table width="100%"  style={style}>
              <TBody>
                <TR>
                  <TD  style={{ color: props.color, fontFamily: 'Arial', fontSize: '28px', textAlign: 'center', paddingTop: '15px' }}>
                    <a href={url}>
                      <Img src={url + "/email/logo.png"} width={200} alt={sitename}/>
                    </a>
                  </TD>
                </TR>
              </TBody>
            </Table>
          </TD>
        </TR>
      </TBody>
    </Table>
  );
};

Header.propTypes = {
  color: PropTypes.string.isRequired
};

export default Header;
