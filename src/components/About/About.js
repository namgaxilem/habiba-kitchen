import React from 'react';
import './about.scss';
import avatar from './avatar.jpg'

function About() {
    return (
        <div className="container">
            <h3>About us</h3>
            <p>The story began 28 years ago. Habiba is her name. The most caring, loving, and patient human being I have ever known. My grandmother Habiba, after whom I named a venture, a learning journey to undertake, a passion and a love she cultivated in me since childhood.</p>
            <p>I feel privileged to come from a self-sustained family from a small village amid the atlas mountains of Morocco. A family that grew olives, pressed the oil, made condiments and grew vegetables. A family of thirteen with food at the center of everything. We had two filled tables. Food was always shared but never without all family members present.</p>
            <p>As time passed and I grew up my personality changed as often as a snake shed its skin, but some things never changed: my love for Habiba and food and the fond memories of sharing a table with family.</p>
            <p>Youssef El Hamdaouy</p>
            <img src={avatar} />
        </div>
    );
}
export default About;