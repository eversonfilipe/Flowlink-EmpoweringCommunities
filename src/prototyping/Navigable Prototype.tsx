import React, { useState, useEffect } from 'react';
import { MapPin, AlertCircle, MessageSquare, BarChart3, Users, Menu, X, CheckCircle, AlertTriangle, Info, Send, Phone, FileText, Settings, Bell, Search, Filter, Download, Eye, User, ChevronRight, ChevronDown, Home, Activity, Globe, Shield, Droplets, Zap, TrendingUp, Calendar, Clock, Star, ThumbsUp, MessageCircle, Play, Pause, Volume2, VolumeX } from 'lucide-react';

const FlowLink = () => {
  const [currentPage, setCurrentPage] = useState('vulnerability-mapping');
  const [userType, setUserType] = useState('end-user'); // end-user, community-leader, manager
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [alertsData, setAlertsData] = useState({
    cantareira: 34,
    altoTiete: 67,
    guarapiranga: 45,
    rioGrande: 78
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAlertsData(prev => ({
        cantareira: Math.max(0, prev.cantareira + (Math.random() - 0.5) * 2),
        altoTiete: Math.max(0, prev.altoTiete + (Math.random() - 0.5) * 2),
        guarapiranga: Math.max(0, prev.guarapiranga + (Math.random() - 0.5) * 2),
        rioGrande: Math.max(0, prev.rioGrande + (Math.random() - 0.5) * 2)
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const showFeedback = (message) => {
    setFeedbackMessage(message);
    setTimeout(() => setFeedbackMessage(''), 3000);
  };

  const userTypeConfig = {
    'end-user': {
      name: 'Vulnerable Resident',
      color: 'bg-red-500',
      pages: ['vulnerability-mapping', 'alerts-monitoring', 'communication', 'social-participation']
    },
    'community-leader': {
      name: 'Community Leader',
      color: 'bg-orange-500',
      pages: ['vulnerability-mapping', 'alerts-monitoring', 'communication', 'governance-dashboard', 'social-participation']
    },
    'manager': {
      name: 'Manager/Activist',
      color: 'bg-blue-500',
      pages: ['vulnerability-mapping', 'alerts-monitoring', 'governance-dashboard', 'social-participation', 'communication']
    }
  };

  const pages = {
    'vulnerability-mapping': {
      title: 'Water Vulnerability Mapping',
      icon: MapPin,
      color: 'text-red-600'
    },
    'alerts-monitoring': {
      title: 'Continuous Monitoring & Alerts',
      icon: AlertCircle,
      color: 'text-orange-600'
    },
    'communication': {
      title: 'Multi-level Communication',
      icon: MessageSquare,
      color: 'text-green-600'
    },
    'governance-dashboard': {
      title: 'Governance Dashboard',
      icon: BarChart3,
      color: 'text-blue-600'
    },
    'social-participation': {
      title: 'Social Participation Portal',
      icon: Users,
      color: 'text-purple-600'
    }
  };

  const mockRegions = [
    { id: 1, name: 'East Zone', risk: 'HIGH', population: 120000, reliability: 68, vulnerability: 7.2 },
    { id: 2, name: 'West Zone', risk: 'MEDIUM', population: 95000, reliability: 78, vulnerability: 5.8 },
    { id: 3, name: 'North Zone', risk: 'LOW', population: 85000, reliability: 92, vulnerability: 3.2 },
    { id: 4, name: 'South Zone', risk: 'HIGH', population: 110000, reliability: 65, vulnerability: 8.1 },
    { id: 5, name: 'Central Zone', risk: 'MEDIUM', population: 75000, reliability: 82, vulnerability: 4.9 }
  ];

  const Header = () => (
    <header className="bg-white shadow-sm border-b-2 border-blue-500 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Droplets className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">FlowLink</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <div className={`px-3 py-1 rounded-full text-white text-sm ${userTypeConfig[userType].color}`}>
                {userTypeConfig[userType].name}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title={audioEnabled ? 'Disable Audio' : 'Enable Audio'}
            >
              {audioEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            
            <button
              onClick={() => showFeedback('Notifications checked')}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {feedbackMessage && (
        <div className="absolute top-full left-0 right-0 z-50 bg-green-500 text-white text-center py-2 shadow-lg">
          {feedbackMessage}
        </div>
      )}
    </header>
  );

  const Navigation = () => (
    <nav className={`bg-white shadow-sm ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:space-x-8 py-4">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <select
              value={userType}
              onChange={(e) => {
                setUserType(e.target.value);
                showFeedback(`Switched to ${userTypeConfig[e.target.value].name} view`);
              }}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="end-user">Vulnerable Resident</option>
              <option value="community-leader">Community Leader</option>
              <option value="manager">Manager/Activist</option>
            </select>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
            {userTypeConfig[userType].pages.map((pageId) => {
              const page = pages[pageId];
              const IconComponent = page.icon;
              return (
                <button
                  key={pageId}
                  onClick={() => {
                    setCurrentPage(pageId);
                    showFeedback(`Navigated to ${page.title}`);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === pageId
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="text-sm">{page.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );

  const VulnerabilityMapping = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">RMSP Water Vulnerability Map</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => showFeedback('Audio guide started')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>Audio Guide</span>
            </button>
            <button
              onClick={() => showFeedback('Help section opened')}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Help
            </button>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-8 mb-6 min-h-[400px] flex flex-col items-center justify-center">
          <MapPin className="w-16 h-16 text-gray-400 mb-4" />
          <p className="text-gray-600 text-center">
            <strong>Interactive Map Integration</strong><br />
            Here would be integrated: Leaflet.js + OpenStreetMap API<br />
            Features: Click regions for vulnerability details, geolocation services<br />
            <em>Nominatim API for geocoding, real-time risk level visualization</em>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => {
              setSelectedRegion(mockRegions[0]);
              showFeedback('Checking your area...');
            }}
            className="flex items-center justify-center space-x-2 px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <Search className="w-5 h-5" />
            <span>Check My Area</span>
          </button>
          <button
            onClick={() => showFeedback('Location finder activated')}
            className="flex items-center justify-center space-x-2 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <MapPin className="w-5 h-5" />
            <span>Find Location</span>
          </button>
        </div>

        {selectedRegion && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Your Region Status</h3>
            <div className={`p-4 rounded-lg mb-4 ${
              selectedRegion.risk === 'HIGH' ? 'bg-red-50 border border-red-200' :
              selectedRegion.risk === 'MEDIUM' ? 'bg-yellow-50 border border-yellow-200' :
              'bg-green-50 border border-green-200'
            }`}>
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className={`w-5 h-5 ${
                  selectedRegion.risk === 'HIGH' ? 'text-red-600' :
                  selectedRegion.risk === 'MEDIUM' ? 'text-yellow-600' :
                  'text-green-600'
                }`} />
                <span className="font-bold">
                  {selectedRegion.risk} RISK
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Your area is classified as {selectedRegion.risk.toLowerCase()} vulnerable to water scarcity
              </p>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• Population density: {selectedRegion.population.toLocaleString()} people</p>
              <p>• Water access reliability: {selectedRegion.reliability}%</p>
              <p>• Socio-economic vulnerability index: {selectedRegion.vulnerability}/10</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => showFeedback('Emergency report initiated')}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <AlertCircle className="w-5 h-5" />
            <span>Report Issue</span>
          </button>
          <button
            onClick={() => showFeedback('Detailed view opened')}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Eye className="w-5 h-5" />
            <span>View Details</span>
          </button>
          <button
            onClick={() => {
              setAudioEnabled(true);
              showFeedback('Audio guide started');
            }}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Volume2 className="w-5 h-5" />
            <span>Audio Guide</span>
          </button>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">🔧 Accessibility Features</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Large, high-contrast buttons for easy navigation</li>
          <li>• Audio descriptions for map elements</li>
          <li>• Simple language and clear visual indicators</li>
          <li>• Touch-friendly interface for mobile devices</li>
        </ul>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h4 className="font-semibold text-purple-800 mb-2">⚙️ Technical Integration Notes</h4>
        <ul className="text-sm text-purple-700 space-y-1">
          <li>• Map API: Leaflet.js with OpenStreetMap tiles</li>
          <li>• Geocoding: Nominatim API for location services</li>
          <li>• Real-time updates: WebSocket connections for live data</li>
          <li>• Offline support: Service worker for cached content</li>
        </ul>
      </div>
    </div>
  );

  const AlertsMonitoring = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Real-Time Water Monitoring</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => showFeedback('Alert settings opened')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Configure Alerts</span>
            </button>
            <button
              onClick={() => showFeedback('Audio status activated')}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen to Status</span>
            </button>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="font-bold text-red-800">CRITICAL ALERT</span>
          </div>
          <p className="text-red-700">
            Water supply interruption scheduled for your area tomorrow 6AM-2PM
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {Object.entries(alertsData).map(([system, level]) => (
            <div key={system} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className={`text-3xl font-bold mb-2 ${
                level < 30 ? 'text-red-600' : 
                level < 60 ? 'text-yellow-600' : 
                'text-green-600'
              }`}>
                {Math.round(level)}%
              </div>
              <div className="text-sm text-gray-600 capitalize">
                {system.replace(/([A-Z])/g, ' $1').trim()} System
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-100 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Water Level Trends - Last 30 Days</h3>
          <div className="h-32 flex items-center justify-center text-gray-600">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <strong>Chart.js Integration</strong><br />
              Real-time data visualization with historical trends<br />
              <em>Connected to Google Sheets API for data storage</em>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Your Area Status</h3>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-bold text-green-800">NORMAL</span>
            </div>
            <p className="text-green-700">
              Water supply is currently stable in your region
            </p>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Next scheduled maintenance: No maintenance planned</p>
            <p>Current pressure: Normal (4.2 bar)</p>
            <p>Quality index: Excellent (98.5/100)</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">🔧 Accessibility Features</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Voice alerts and audio status updates</li>
          <li>• Simple color-coded warning system</li>
          <li>• SMS notifications for basic phones</li>
          <li>• Large text and high contrast mode</li>
        </ul>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h4 className="font-semibold text-purple-800 mb-2">⚙️ Technical Integration Notes</h4>
        <ul className="text-sm text-purple-700 space-y-1">
          <li>• Email notifications: EmailJS for free tier alerts</li>
          <li>• Browser notifications: Web Push API for instant alerts</li>
          <li>• SMS integration: Twilio API for critical notifications</li>
          <li>• Data visualization: Chart.js with real-time updates</li>
        </ul>
      </div>
    </div>
  );

  const Communication = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Communication Center</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => showFeedback('Help line contacted')}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Help Line</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => showFeedback('Emergency report initiated')}
            className="flex items-center justify-center space-x-2 px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            <AlertCircle className="w-5 h-5" />
            <span>Report Emergency</span>
          </button>
          <button
            onClick={() => showFeedback('Chat started')}
            className="flex items-center justify-center space-x-2 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Start Chat</span>
          </button>
          <button
            onClick={() => showFeedback('Complaint form opened')}
            className="flex items-center justify-center space-x-2 px-6 py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            <FileText className="w-5 h-5" />
            <span>File Complaint</span>
          </button>
          <button
            onClick={() => showFeedback('Help line contacted')}
            className="flex items-center justify-center space-x-2 px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <Phone className="w-5 h-5" />
            <span>Call Help Line</span>
          </button>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto mb-6">
          <h3 className="text-lg font-semibold mb-4">Live Chat Support</h3>
          <div className="space-y-3">
            <div className="bg-blue-100 rounded-lg p-3 max-w-xs ml-auto">
              <p className="text-sm">Water has been cut off in my building for 3 days. When will it be restored?</p>
            </div>
            <div className="bg-white rounded-lg p-3 max-w-xs border border-gray-200">
              <p className="text-sm">Thank you for reporting. We've escalated your case to the Municipal Water Authority. Case ID: #WR-2024-0847</p>
            </div>
            <div className="bg-white rounded-lg p-3 max-w-xs border border-gray-200">
              <p className="text-sm">Update: Technical team dispatched to your area. Expected restoration: 6-8 hours.</p>
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => {
                if (newMessage.trim()) {
                  showFeedback('Message sent');
                  setNewMessage('');
                }
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500">
            <strong>Integration:</strong> Socket.io + Heroku for real-time chat<br />
            <em>Alternative: Glide native chat with Google Sheets backend</em>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">My Reports</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div>
                <p className="font-medium">Case #WR-2024-0847 - Water outage</p>
                <p className="text-sm text-gray-600">Reported 2 hours ago</p>
              </div>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                IN PROGRESS
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div>
                <p className="font-medium">Case #WR-2024-0823 - Low pressure</p>
                <p className="text-sm text-gray-600">Reported 1 week ago</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                RESOLVED
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div>
                <p className="font-medium">Case #WR-2024-0801 - Quality issue</p>
                <p className="text-sm text-gray-600">Reported 2 weeks ago</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                RESOLVED
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => showFeedback('Municipal level contacted')}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Municipal
          </button>
          <button
            onClick={() => showFeedback('State level contacted')}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            State
          </button>
          <button
            onClick={() => showFeedback('Federal level contacted')}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Federal
          </button>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">🔧 Accessibility Features</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Voice-to-text for report submission</li>
          <li>• Simple language in all communications</li>
          <li>• Multiple contact methods (chat, phone, form)</li>
          <li>• Clear status updates and case tracking</li>
        </ul>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h4 className="font-semibold text-purple-800 mb-2">⚙️ Technical Integration Notes</h4>
        <ul className="text-sm text-purple-700 space-y-1">
          <li>• Ticketing system: Airtable Forms with automation</li>
          <li>• Real-time chat: Socket.io or Glide native messaging</li>
          <li>• Multi-level routing: Automated escalation workflows</li>
          <li>• Case management: Auto-generated IDs and status tracking</li>
        </ul>
      </div>
    </div>
  );

  const GovernanceDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Governance Dashboard</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => showFeedback('Full reports opened')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              <span>View Full Reports</span>
            </button>
            <button
              onClick={() => showFeedback('Coordination tools accessed')}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Coordination Tools</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">23</div>
            <div className="text-sm text-gray-600">Active Alerts</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">8</div>
            <div className="text-sm text-gray-600">Emergency Cases</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">156</div>
            <div className="text-sm text-gray-600">Reports Today</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">94%</div>
            <div className="text-sm text-gray-600">Response Rate</div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Priority Actions Required</h3>
          <div className="space-y-3">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span className="font-bold text-red-800">IMMEDIATE</span>
              </div>
              <p className="text-red-700">Approve emergency water distribution for East Zone</p>
              <button
                onClick={() => showFeedback('Emergency approval initiated')}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Take Action
              </button>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <span className="font-bold text-yellow-800">URGENT</span>
              </div>
              <p className="text-yellow-700">Review budget allocation for infrastructure repairs</p>
              <button
                onClick={() => showFeedback('Budget review started')}
                className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
              >
                Review
              </button>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Info className="w-5 h-5 text-green-600" />
                <span className="font-bold text-green-800">INFO</span>
              </div>
              <p className="text-green-700">Monthly coordination meeting scheduled for tomorrow</p>
              <button
                onClick={() => showFeedback('Calendar event added')}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                Add to Calendar
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Multi-Entity Coordination Timeline</h3>
          <div className="h-32 flex items-center justify-center text-gray-600">
            <div className="text-center">
              <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <strong>Google Data Studio Integration</strong><br />
              Real-time coordination timeline and decision tracking<br />
              <em>Connected to Google Sheets for automated logging</em>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">🔧 Management Features</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Real-time data consolidation from multiple sources</li>
          <li>• Automated alert prioritization system</li>
          <li>• Cross-agency collaboration tools</li>
          <li>• Decision tracking and transparency logs</li>
        </ul>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h4 className="font-semibold text-purple-800 mb-2">⚙️ Technical Integration Notes</h4>
        <ul className="text-sm text-purple-700 space-y-1">
          <li>• Analytics: Google Analytics 4 with custom events</li>
          <li>• Data visualization: Chart.js with real-time updates</li>
          <li>• Decision logging: Google Apps Script automation</li>
          <li>• Multi-source data: API aggregation and normalization</li>
        </ul>
      </div>
    </div>
  );

  const SocialParticipation = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Social Participation Portal</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => showFeedback('Suggestion submitted')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Submit Suggestion</span>
            </button>
            <button
              onClick={() => showFeedback('Transparency data accessed')}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>View Transparency</span>
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Active Public Consultations</h3>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <MessageCircle className="w-5 h-5 text-yellow-600" />
              <span className="font-bold text-yellow-800">Open for Comments</span>
            </div>
            <p className="text-yellow-700 mb-2">New Water Treatment Plant Proposal for South Zone</p>
            <p className="text-sm text-yellow-600">Deadline: 15 days remaining | 234 comments received</p>
            <button
              onClick={() => showFeedback('Joined consultation')}
              className="mt-3 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              💬 Participate
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Community Forum</h3>
          <div className="space-y-3">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Water quality improvements in North Zone</h4>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <ThumbsUp className="w-4 h-4" />
                  <span>12</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">Posted by Maria S. - Community Leader | 12 replies</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Suggestion: Mobile water trucks for emergencies</h4>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <ThumbsUp className="w-4 h-4" />
                  <span>8</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">Posted by João R. - Resident | 8 replies</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Budget transparency request</h4>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <ThumbsUp className="w-4 h-4" />
                  <span>23</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">Posted by Ana L. - Activist | 23 replies</p>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500">
            <strong>Integration:</strong> Glide native comments system<br />
            <em>Alternative: Custom forum with Google Sheets backend</em>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Resource Monitoring</h3>
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <div className="h-32 flex items-center justify-center text-gray-600">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <strong>Budget Allocation and Spending Transparency</strong><br />
                <em>Google Data Studio charts with real-time budget data</em>
              </div>
            </div>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <p>Infrastructure investments: R$ 2.3M allocated, R$ 1.8M spent</p>
            <p>Emergency response fund: R$ 500K allocated, R$ 320K spent</p>
            <p>Community programs: R$ 150K allocated, R$ 89K spent</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">🔧 Participation Features</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Multi-language support for diverse communities</li>
          <li>• Audio versions of consultation documents</li>
          <li>• Simple voting and feedback mechanisms</li>
          <li>• Mobile-first design for widespread access</li>
        </ul>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h4 className="font-semibold text-purple-800 mb-2">⚙️ Technical Integration Notes</h4>
        <ul className="text-sm text-purple-700 space-y-1">
          <li>• Forum system: Glide native with Google Sheets storage</li>
          <li>• Document management: Google Drive with access controls</li>
          <li>• Voting system: Custom implementation with result tracking</li>
          <li>• Transparency data: Automated budget visualization</li>
        </ul>
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'vulnerability-mapping':
        return <VulnerabilityMapping />;
      case 'alerts-monitoring':
        return <AlertsMonitoring />;
      case 'communication':
        return <Communication />;
      case 'governance-dashboard':
        return <GovernanceDashboard />;
      case 'social-participation':
        return <SocialParticipation />;
      default:
        return <VulnerabilityMapping />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentPage()}
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Droplets className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">FlowLink</span>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Integrated Water Governance System for the São Paulo Metropolitan Region (RMSP).
              Addressing urban water scarcity through technology, transparency, and community engagement.
            </p>
            <div className="mt-4 text-sm text-gray-500">
              <p>Prototype Version 1.9.0 | Built with React + Tailwind CSS</p>
              <p>Ready for integration with free APIs and no-code platforms</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FlowLink;
