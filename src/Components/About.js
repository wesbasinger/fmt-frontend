import React from 'react';
import ReactMarkdown from 'react-markdown';

const About = (props) => {
  return(
    <div className="starter-template">
      <ReactMarkdown source={props.markdown} />
    </div>
  )
}

export default About;
