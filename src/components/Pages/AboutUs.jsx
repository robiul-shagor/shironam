import Header from '../Common/Header/Header'
import Footer from '../Common/Footer/Footer'

const AboutUs = () => {
  return (
    <div className='about-us-wrapper'>
        <Header />
        <div className="main_content mt-[8.7rem] sm:mt-[8.5rem] md:mt-[7.5rem] xl:mt-[8.5rem] py-32">
          <div className="container">
              <h2 className="font-bold mb-12 text-[2.8rem] dark:text-white">About Us</h2>
              <div className="space-y-16 border-l-2 border-gray-400 pl-8 sm:pl-12">
                  <p>
                      Tellus id interdum velit laoreet id. Integer feugiat scelerisque varius morbi enim nunc. Vulputate dignissim suspendisse in est ante. Libero id faucibus nisl tincidunt eget nullam non. Facilisis magna etiam tempor orci eu lobortis. Quis eleifend quam adipiscing vitae. Vel pretium lectus quam id leo in vitae turpis. Ipsum a arcu cursus vitae congue mauris. Est velit egestas dui id ornare arcu. Massa ultricies mi quis hendrerit dolor magna eget.
                  </p>
                  <p>
                      Nunc sed velit dignissim sodales ut. Et malesuada fames ac turpis egestas sed tempus. Vitae congue eu consequat ac. Amet dictum sit amet justo donec enim diam vulputate ut. Ultricies tristique nulla aliquet enim tortor at. Semper auctor neque vitae tempus quam pellentesque nec. Sed turpis tincidunt id aliquet risus feugiat in ante metus.
                  </p>
              </div>

              <div className="mt-16 md:mt-28 md:grid md:grid-cols-12 gap-x-12 max-[767px]:space-y-8">

                  <div className="image col-span-6 md:col-span-4 xl:col-span-5">
                      <img src="/assets/media/mission-img.png" alt="Our Values And Mission" />
                  </div>

                  <div className="col-span-6 md:col-span-8 xl:col-start-6">

                      <h3 className="font-semibold text-[2.4rem] mb-8 dark:text-white">Our Values And Mission</h3>
                      <div className="space-y-12 border-l-2 border-gray-400 pl-8 md:pl-12">
                          <p>
                              Integer eget aliquet nibh praesent tristique. Tempus quam pellentesque nec nam aliquam sem. Ut sem viverra aliquet eget sit amet tellus cras. Neque laoreet suspendisse interdum consectetur. Viverra nam libero justo laoreet sit amet cursus sit. Urna duis convallis convallis tellus id interdum velit. Sed pulvinar proin gravida hendrerit lectus a. Vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur. 
                          </p>
                          <p>
                              Adipiscing diam donec adipiscing tristique risus nec feugiat. Morbi tempus iaculis urna id volutpat lacus laoreet non curabitur. Vestibulum sed arcu non odio euismod lacinia at quis. Quam pellentesque nec nam aliquam. Tempus egestas sed sed.
                          </p>
                      </div>
                  </div>
              </div>
          </div>
        </div>
        <Footer />
    </div>
  )
}

export default AboutUs