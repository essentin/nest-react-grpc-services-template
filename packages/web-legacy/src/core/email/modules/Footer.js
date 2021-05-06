import React from 'react';
import { Table, TBody, TD, TR, Img } from 'oy-vey';
import { sitename, url } from '../../../config';


const Footer = (props) => {
  const style = {
    backgroundColor: '#222d3a',
  };

  const spaceStyle = {
    paddingTop: '40px',
    paddingBottom: '25px',
    paddingLeft: '5px',
    color: '#fff',
    fontSize: '14px',
    textAlign: 'center',
    backgroundColor: '#222d3a'
  };
  
  const socialSection = {
    textAlign: 'center',
    paddingBottom: '60px'
  }

  const linkText = {
    fontSize: '16px',
    lineHeight: '2.19',
    textAlign: 'center',
    color: '#ffc984'
  }

  const linkTextImage = {
    padding: '0px 10px',
    display: 'inline-block'
  }


  let facebookLink = props && props.siteSettings && props.siteSettings.facebookLink || '';
  let instagramLink = props && props.siteSettings && props.siteSettings.instagramLink || '';
  let linkedinLink = props && props.siteSettings && props.siteSettings.linkedinLink || '';
  let pinterestLink = props && props.siteSettings && props.siteSettings.pinterestLink || '';

  return (
    <Table width="100%" style={style}>
      <TBody>
        <TR>
          <TD>
            <div>
              <div style={spaceStyle}>
                <div>
                  <a href={url} style={linkText}>
                    Visit flowpass.co
                  </a>
                </div>
                <div>
                  <a href={url + '/support'} style={linkText}>
                    FAQ
                  </a>
                </div>
                <div>
                  <a href={url + '/aboutus/for-workers'} style={linkText}>
                    About us
                  </a>
                </div>
              </div>
              <div style={socialSection}>
                <a href={linkedinLink} style={linkTextImage}>
                  <Img src={url + "/email/linkedin.png"} width={22} alt='linkedin' />
                </a>
                <a href={instagramLink} style={linkTextImage}>
                  <Img src={url + "/email/instagram.png"} width={24} alt='instagram' />
                </a>
                <a href={facebookLink} style={linkTextImage}>
                  <Img src={url + "/email/facebook.png"} width={24} alt='facebook' />
                </a>
                <a href={pinterestLink} style={linkTextImage}>
                  <Img src={url + "/email/pinterest.png"} width={24} alt='pinterest' />
                </a>
              </div>
            </div>
          </TD>
        </TR>
      </TBody>
    </Table>
  );
};

export default Footer;