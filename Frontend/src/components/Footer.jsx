function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-950  text-gray-300 font-playfair">
            <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {/* Column 1: Brand Info */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-1">
                        <h2 className="text-2xl font-bold text-white mb-2">StackScribe</h2>
                        <p className="text-gray-400">Stories worth sharing, ideas worth spreading.</p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="font-semibold text-white tracking-wider uppercase mb-4">Quick Links</h3>
                        <ul>
                            <li className="mb-2"><a href="#" className="hover:text-white transition-colors">Home</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-white transition-colors">About</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Categories */}
                    <div>
                        <h3 className="font-semibold text-white tracking-wider uppercase mb-4">Categories</h3>
                        <ul>
                            <li className="mb-2"><a href="#" className="hover:text-white transition-colors">Technology</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-white transition-colors">Creativity</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-white transition-colors">Productivity</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-white transition-colors">Lifestyle</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Legal */}
                    <div>
                        <h3 className="font-semibold text-white tracking-wider uppercase mb-4">Legal</h3>
                        <ul>
                            <li className="mb-2"><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Column 5: Social Media */}
                     <div>
                        <h3 className="font-semibold text-white tracking-wider uppercase mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                           <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                            </a>
                           <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                            </a>
                           <a href="#" className="text-gray-400 hover:text-white transition-colors">
                               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.795 2.013 10.148 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0-2a7 7 0 110 14 7 7 0 010-14zm6.406-2.31a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" clipRule="evenodd" /></svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
                    <p>&copy; {currentYear} YourBrand. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
 

export default Footer