import React, { useState } from 'react'
import { useFormik } from 'formik'

const initialValues ={
  name:"",
  email:"",
  subject:"",
  message:""

}

 const validate = values =>{
  let errors = {}
  if (!values.name){
    errors.name = "Required"
  } else if (values.name.length <15){
    errors.name  = "Must be more than 15 characters"
  }
  if (!values.email){
    errors.email= "Required"
  }   else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  
  if (!values.subject){
    errors.subject = "required"
  }
  if (!values.message){
    errors.message= "required"
  } 
  return errors
  
 }
const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const[error, setError] = useState(null)
  
   const formik =useFormik({
    initialValues ,
   onSubmit : (values,  actions, ) =>{
    setLoading(true);
     // resetForm({values : ' '})
  // console.log("hi :" ,resetForm)
const data = {
    "id": 4,
    "name": values.name,
    "email": values.email,
    "subject": values.subject,
    "message": values.message
  }
  console.log('Form data', values);
    fetch(
      "https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries",
      {method: "POST",
      body: JSON.stringify(data)
    }
   ) 
   .then ((response) => {
      if(!response.ok ){
        console.log({response})
        throw new Error (`Submission Unsuccesfull`);
      }
      return response.json();
    })
    .then((actualData) =>{
      console.log(actualData)
      setMessage(`Thank You!!! Your Form has been submitted successfully`)
      setError(null)
      actions.resetForm()
    })
    .catch((error) =>{
      console.log(error)
      setError(error)
      setMessage(null)
    })
    .finally(()=>{
      setLoading(false)
    })

 

 },
   validate
   })
  //  console.log('Form errors', formik.errors)
  return (
    <div className='form-wrapper'>
          {message && (
            <div  className='message'>{message}</div>
          )}  
          {error &&   <div className='error-text'>Submission Unsuccessful!!! Please try again...</div>}
            <h1 className='form_head'>CONTACT US</h1>
            <p className='form-pargh'>Please use this form to contact us and we will get back to you as soon as possible</p>
        <form onSubmit={formik.handleSubmit}>
            <div className='name-field'>
            <label htmlFor='name'>FULL NAME</label>
            <input type='text' id='name'  name = 'name'  value={formik.values.name} onChange={formik.handleChange}/>
            {formik.errors.name ? <div  className='error'>{formik.errors.name}</div> : null}
            </div>
            <div className='email-field'>
            <label htmlFor='email'>EMAIL</label>
            <input type='text' id='email'  name = 'email'    placeholder='Email' value={formik.values.email} onChange={formik.handleChange}/>
            {formik.errors.email? <div className='error'>{formik.errors.email}</div> : null}
            </div>
            <div className='subject-field'>
            <label htmlFor='subject'>SUBJECT</label>
            <input type='text' id='subject'  name = 'subject'  placeholder='Subject' value={formik.values.subject} onChange={formik.handleChange}/>
            {formik.errors.subject ? <div  className='error'>{formik.errors.subject}</div> : null}
            </div>
            <div className='message-field'>
            <label htmlFor='message'>MESSAGE</label>  
            <textarea name='message' id='message'  placeholder='Enter your message here' rows='5' value={formik.values.message} onChange={formik.handleChange}></textarea>
            {formik.errors.message? <div  className='error'>{formik.errors.message}</div> : null}
            </div>
            <div className='button-field'>
                <button type='submit' className='btn'>{loading  ? "Sending... ":  "Send Message"}</button> 
            </div>
            
        

            

        </form>

    </div>


                    
  )
}

export default ContactUsForm