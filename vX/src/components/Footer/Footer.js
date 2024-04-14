import React, { Component } from 'react'
import './Footer.css'

export default class Footer extends Component {
  render() {
    return (
      <footer id="my-footer" className="bg-dark">
        <section className="container d-flex justify-content-between align-items-center h-100">
          <article >Create By <a href="https://smhatami.github.io" target="_blank" rel='noreferrer' className="pointer text-white ml-2" id="maker"> S.Mohsen Hatami</a></article>
          <article><button className="mybtn btn-secondary rounded-pill inactive-btn" id="footer-btn"><i className="fa fa-moon" id="footer-icon"></i></button></article>
        </section>
      </footer>
    )
  }
}
