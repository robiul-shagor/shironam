import Header from '../Common/Header/Header'
import Footer from '../Common/Footer/Footer'

const Contact = () => {
  return (
    <div className='contact-wrapper'>
        <Header />
        <div className="main_content mt-[8.7rem] sm:mt-[8.5rem] md:mt-[7.5rem] xl:mt-[8.5rem] py-8 pb-32">
          <div className="container">
              <div className="md:grid grid-cols-12 gap-8 max-[768px]:space-y-16 pt-32">
                  <div className="contact-form col-span-6 lg:col-span-5 dark:text-white">
                      <h1 className="font-bold mb-12">Contact Us</h1>
                      <form action="#" className="space-y-8">
                          <div className="form-group">
                              <label>First Name <span className="text-red-600">*</span></label>
                              <input type="text" className="form-control dark:bg-slate-800" required />
                          </div>
                          <div className="form-group">
                              <label>Email<span className="text-red-600">*</span></label>
                              <input type="email" className="form-control dark:bg-slate-800" required />
                          </div>
                          <div className="form-group">
                              <label>Phone Number</label>
                              <input type="text" className="form-control dark:bg-slate-800" />
                          </div>
                          <div className="form-group">
                              <label>Message<span className="text-red-600">*</span></label>
                              <textarea rows="10" className="w-full dark:bg-slate-800" required></textarea>
                          </div>
                          <div>
                              <button className="btn-dark-full dark:bg-[#272727]">Send Message</button>
                          </div>
                      </form>
                  </div>
                  <div className="col-span-6 lg:col-start-7">
                      <div className="loacation-map md:h-full">
                          <iframe className="w-full h-[40rem] md:h-full" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2715.788325377906!2d90.40337409946578!3d23.768362300084465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1678465294324!5m2!1sen!2sbd" ></iframe>
                      </div>
                  </div>
              </div>
          </div>
        </div>
        <Footer />
    </div>
  )
}

export default Contact