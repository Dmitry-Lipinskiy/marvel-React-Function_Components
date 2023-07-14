import { Link } from "react-router-dom";

import { ErrorMessage } from "../../errorMessage/ErrorMessage";

const Page404 = () => (
  <>
    <ErrorMessage />
    <p 
      style={{ 
        textAlign: 'center', 
        fontWeight: 'bold', 
        fontSize: '24px' 
      }}
    >
      Page doesn't exist
    </p>
    <Link 
      style={{ 
        display: 'block', 
        textAlign: 'center', 
        fontWeight: 'bold', 
        fontSize: '24px', 
        marginTop: '30px', 
        color: '#9f0013' 
      }}
      to='/'
    >
      Back to main page
    </Link>
  </>
);

export default Page404;

