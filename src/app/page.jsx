import About from '@/components/About'
import Contact from '@/components/Contact'
import FoodProducts from '@/components/FoodProducts'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import Rooms from '@/components/Rooms'
import Service from '@/components/Service'
import Staffs from '@/components/Staffs'
import AuthGuard from '@/components/AuthGuard'
import React from 'react'


const Home = () => {
  return (
    <AuthGuard>
      <div>
        <Navbar />

        <section id="home">
          <Header />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="service">
          <Service />
        </section>

        <section id="staff">
          <Staffs />
        </section>

        <section id="rooms">
          <Rooms />
        </section>


        <section id="contact">
          <Contact />
        </section>

        <section id="footer">
          <Footer />
        </section>
      </div>
    </AuthGuard>
  )
}

export default Home