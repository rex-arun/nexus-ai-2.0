import "./Home.css";
import phoneImage from './phone.png';
import nexausVideo from './nexaus.mp4';

export default function Home({ onGetStarted }) {
    return (
        <>
            {/* Hero Section */}
            <section className="hero-section">
                {/* Gradient Overlay */}
                <div className="gradient-overlay"></div>

                <div className="hero-container">
                    <h5 className="hero-tagline">Welcome to...</h5>
                    <h1 className="hero-title">
                        NexusAI: The Chat Assistant That Makes Life Effortless, Fun, and Productive
                    </h1>
                    <h3 className="hero-subtitle">
                        From small talk to serious tasks, NexusAI is here to help you every step of the way.
                    </h3>
                    {/* Get Started Button */}
                    <button className="start-button" onClick={onGetStarted}>
                        Get Started <i className="ri-arrow-right-line"></i>
                    </button>
                </div>

                {/* Features Section */}
                <div className="features">
                    <div className="f-1">
                        <h3>Smart Conversation</h3>
                        <p>Engage in natural, intelligent, and meaningful chats for any topic or task.</p>
                    </div>
                    <div className="f-2">
                        <h3>Task Automation</h3>
                        <p>Effortlessly manage your daily tasks and routines with powerful automation.</p>
                    </div>
                    <div className="f-3">
                        <h3>Instant Help</h3>
                        <p>Quickly find the answers you need, saving time and effort with every query.</p>
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <section className="Video">
                <div className="video-container">
                    <h1>How It Works</h1>
                    {/* Video Playback */}
                    <video className="video" autoPlay loop muted>
                        <source src={nexausVideo} type="video/mp4" />
                    </video>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section">
                <div className="about-container">
                    <h1>What is NexusAI?</h1>
                    <div className="about">
                   <p>NexusAI is more than just a chat assistant – it's your smart companion designed to make life easier, more organized, and enjoyable. Whether you need help managing tasks, engaging in meaningful conversations, or staying productive, NexusAI is here to assist every step of the way. </p>
                    <p>With cutting-edge AI technology, NexusAI adapts to your needs, learns from your interactions, and delivers a personalized experience like no other. It's intuitive, efficient, and built to simplify your life, giving you more time to focus on what truly matters.</p>
                    <p>Let NexusAI redefine how you interact with technology – effortless, fun, and productive.</p>
                    </div>
                </div>
            </section>

            {/* Mobile Optimization Section */}
            <section className="phone">
                <div className="phone-container">
                    {/* Phone Image */}
                    <img className="phone-image" src={phoneImage} alt="Phone" />
                    <div className="phone-content">
                        <h1 className="phone-title">Effortless Help, Anytime, Anywhere</h1>
                        <p className="phone-body">
                        NexusAI is fully optimized for mobile, providing a seamless, responsive experience on any device. Whether you're managing tasks, setting reminders, or simply chatting with NexusAI, the interface adapts smoothly to your screen size. With touch-friendly buttons, voice interaction, and fast load times, NexusAI ensures you get the best performance without any hassle—whether you're at home or on the go. Experience the future of AI assistance, designed with mobile users in mind.
                        </p>
                    </div>
                </div>
            </section>

            {/* Games Section */}
            <section className="Games">
                <div className="games-container">
                    <div className="games-content">
                        <h1 className="games-title">Getting Bored? Play with NexusAI!</h1>
                        <p className="games-subtitle">
                        Need a break or want to have some fun? NexusAI isn't just about productivity—it's also your personal entertainment assistant! With games like Tic-Tac-Toe, Snake, and Rock Paper Scissors, NexusAI keeps you entertained while providing a fun way to relax.
                        </p>
                    </div>
                    <div className="games-item">
                        <div className="g1">
                            <h3>Tic-Tac-Toe</h3>
                            <p>Challenge NexusAI to a classic game of Tic-Tac-Toe.</p>
                        </div>
                        <div className="g2">
                            <h3>Snake Game</h3>
                            <p>See how long you can last while guiding your snake to victory.</p>
                        </div>
                        <div className="g3">
                            <h3>Rock Paper Scissors</h3>
                            <p>Play anytime and see if you can beat the AI!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact">
                <h2>Contact Us</h2>
                <p>We’re here to help! Reach out to us anytime.</p>
                <div>
                    <p>
                        <i className="ri-mail-line"></i> Email:{" "}
                        <a href="mailto:support@nexusai.com">support@nexusai.com</a>
                    </p>
                    <p>
                        <i className="ri-phone-line"></i> Phone:{" "}
                        <a href="tel:+1234567890">+1 234 567 890</a>
                    </p>
                    <p>
                        <i className="ri-building-line"></i> Address: 123 NexusAI Lane, Tech City, TX
                    </p>
                    {/* Contact Form */}
                    <form id="contactForm">
                        <input type="text" id="name" placeholder="Your Name" required />
                        <input type="email" id="email" placeholder="Your Email" required />
                        <textarea id="message" placeholder="Your Message" rows="4" required></textarea>
                        <button type="submit">Send</button>
                    </form>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-logo">
                        <h2>NexusAI</h2>
                    </div>
                    <div className="footer-copyright">
                        <p>&copy; 2025 NexusAI. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}
