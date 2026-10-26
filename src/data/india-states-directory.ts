export interface StateDirectoryInfo {
  stateName: string;
  slug: string;
  postalCircle: string;
  pincodePrefix: string;
  majorDistricts: string[];
  majorBanks: string[];
  totalPostalDivisionsEstimated: number;
}

export const INDIA_STATES_DIRECTORY: StateDirectoryInfo[] = [
  {
    stateName: "Andhra Pradesh",
    slug: "andhra-pradesh",
    postalCircle: "Andhra Pradesh Circle",
    pincodePrefix: "51–53",
    majorDistricts: ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati", "Rajahmundry", "Kakinada"],
    majorBanks: ["State Bank of India", "Andhra Pragathi Grameena Bank", "Union Bank of India", "HDFC Bank", "ICICI Bank", "Canara Bank"],
    totalPostalDivisionsEstimated: 24
  },
  {
    stateName: "Arunachal Pradesh",
    slug: "arunachal-pradesh",
    postalCircle: "North East Circle",
    pincodePrefix: "79",
    majorDistricts: ["Itanagar", "Tawang", "Naharlagun", "Pasighat", "Ziro", "Tezu", "Bomdila"],
    majorBanks: ["State Bank of India", "Arunachal Pradesh Rural Bank", "Axis Bank", "HDFC Bank", "UCO Bank"],
    totalPostalDivisionsEstimated: 6
  },
  {
    stateName: "Assam",
    slug: "assam",
    postalCircle: "Assam Circle",
    pincodePrefix: "78",
    majorDistricts: ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Tezpur", "Tinsukia", "Nagaon", "Bongaigaon"],
    majorBanks: ["State Bank of India", "Assam Gramin Vikash Bank", "Punjab National Bank", "HDFC Bank", "ICICI Bank", "Axis Bank"],
    totalPostalDivisionsEstimated: 18
  },
  {
    stateName: "Bihar",
    slug: "bihar",
    postalCircle: "Bihar Circle",
    pincodePrefix: "80–85",
    majorDistricts: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Purnia", "Darbhanga", "Bihar Sharif", "Ara"],
    majorBanks: ["State Bank of India", "Dakshin Bihar Gramin Bank", "Uttar Bihar Gramin Bank", "Punjab National Bank", "Bank of Baroda", "HDFC Bank"],
    totalPostalDivisionsEstimated: 35
  },
  {
    stateName: "Chhattisgarh",
    slug: "chhattisgarh",
    postalCircle: "Chhattisgarh Circle",
    pincodePrefix: "49",
    majorDistricts: ["Raipur", "Bhilai", "Bilaspur", "Durg", "Korba", "Raigarh", "Jagdalpur", "Ambikapur"],
    majorBanks: ["State Bank of India", "Chhattisgarh Rajya Gramin Bank", "Bank of Baroda", "Punjab National Bank", "HDFC Bank", "ICICI Bank"],
    totalPostalDivisionsEstimated: 16
  },
  {
    stateName: "Goa",
    slug: "goa",
    postalCircle: "Goa Circle",
    pincodePrefix: "403",
    majorDistricts: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Curchorem"],
    majorBanks: ["State Bank of India", "Goa State Cooperative Bank", "Bank of Baroda", "HDFC Bank", "ICICI Bank", "Axis Bank"],
    totalPostalDivisionsEstimated: 4
  },
  {
    stateName: "Gujarat",
    slug: "gujarat",
    postalCircle: "Gujarat Circle",
    pincodePrefix: "36–39",
    majorDistricts: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Anand"],
    majorBanks: ["State Bank of India", "Bank of Baroda", "Baroda Gujarat Gramin Bank", "Saurashtra Gramin Bank", "HDFC Bank", "ICICI Bank"],
    totalPostalDivisionsEstimated: 32
  },
  {
    stateName: "Haryana",
    slug: "haryana",
    postalCircle: "Haryana Circle",
    pincodePrefix: "12–13",
    majorDistricts: ["Gurugram", "Faridabad", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat"],
    majorBanks: ["State Bank of India", "Sarva Haryana Gramin Bank", "Punjab National Bank", "HDFC Bank", "ICICI Bank", "Axis Bank"],
    totalPostalDivisionsEstimated: 20
  },
  {
    stateName: "Himachal Pradesh",
    slug: "himachal-pradesh",
    postalCircle: "Himachal Pradesh Circle",
    pincodePrefix: "17",
    majorDistricts: ["Shimla", "Dharamshala", "Solan", "Mandi", "Kullu", "Bilaspur", "Chamba", "Hamirpur", "Una"],
    majorBanks: ["State Bank of India", "Himachal Pradesh State Cooperative Bank", "Punjab National Bank", "UCO Bank", "HDFC Bank"],
    totalPostalDivisionsEstimated: 12
  },
  {
    stateName: "Jharkhand",
    slug: "jharkhand",
    postalCircle: "Jharkhand Circle",
    pincodePrefix: "82–83",
    majorDistricts: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", "Giridih", "Palamu"],
    majorBanks: ["State Bank of India", "Jharkhand Rajya Gramin Bank", "Bank of India", "Punjab National Bank", "HDFC Bank", "ICICI Bank"],
    totalPostalDivisionsEstimated: 15
  },
  {
    stateName: "Karnataka",
    slug: "karnataka",
    postalCircle: "Karnataka Circle",
    pincodePrefix: "56–59",
    majorDistricts: ["Bengaluru Urban", "Mysuru", "Hubballi-Dharwad", "Mangaluru", "Belagavi", "Kalaburagi", "Davanagere", "Ballari", "Shivamogga"],
    majorBanks: ["State Bank of India", "Canara Bank", "Karnataka Grameena Bank", "Karnataka Vikas Grameena Bank", "HDFC Bank", "ICICI Bank"],
    totalPostalDivisionsEstimated: 34
  },
  {
    stateName: "Kerala",
    slug: "kerala",
    postalCircle: "Kerala Circle",
    pincodePrefix: "67–69",
    majorDistricts: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Alappuzha", "Kannur", "Kottayam"],
    majorBanks: ["State Bank of India", "Federal Bank", "South Indian Bank", "Kerala Gramin Bank", "HDFC Bank", "ICICI Bank"],
    totalPostalDivisionsEstimated: 22
  },
  {
    stateName: "Madhya Pradesh",
    slug: "madhya-pradesh",
    postalCircle: "Madhya Pradesh Circle",
    pincodePrefix: "45–48",
    majorDistricts: ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa"],
    majorBanks: ["State Bank of India", "Madhya Pradesh Gramin Bank", "Central Bank of India", "Bank of India", "HDFC Bank", "ICICI Bank"],
    totalPostalDivisionsEstimated: 40
  },
  {
    stateName: "Maharashtra",
    slug: "maharashtra",
    postalCircle: "Maharashtra Circle",
    pincodePrefix: "40–44",
    majorDistricts: ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad", "Solapur", "Kolhapur", "Amravati", "Nanded"],
    majorBanks: ["State Bank of India", "Bank of Maharashtra", "Vidarbha Konkan Gramin Bank", "HDFC Bank", "ICICI Bank", "Axis Bank"],
    totalPostalDivisionsEstimated: 52
  },
  {
    stateName: "Manipur",
    slug: "manipur",
    postalCircle: "North East Circle",
    pincodePrefix: "795",
    majorDistricts: ["Imphal West", "Imphal East", "Thoubal", "Bishnupur", "Churachandpur", "Senapati", "Ukhrul"],
    majorBanks: ["State Bank of India", "Manipur Rural Bank", "Punjab National Bank", "HDFC Bank", "ICICI Bank"],
    totalPostalDivisionsEstimated: 5
  },
  {
    stateName: "Meghalaya",
    slug: "meghalaya",
    postalCircle: "North East Circle",
    pincodePrefix: "793",
    majorDistricts: ["Shillong", "Tura", "Jowai", "Nongpoh", "Baghmara", "Williamnagar"],
    majorBanks: ["State Bank of India", "Meghalaya Rural Bank", "Bank of Baroda", "HDFC Bank", "ICICI Bank"],
    totalPostalDivisionsEstimated: 5
  },
  {
    stateName: "Mizoram",
    slug: "mizoram",
    postalCircle: "North East Circle",
    pincodePrefix: "796",
    majorDistricts: ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib", "Lawngtlai"],
    majorBanks: ["State Bank of India", "Mizoram Rural Bank", "IDBI Bank", "HDFC Bank", "ICICI Bank"],
    totalPostalDivisionsEstimated: 4
  },
  {
    stateName: "Nagaland",
    slug: "nagaland",
    postalCircle: "North East Circle",
    pincodePrefix: "797",
    majorDistricts: ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Mon"],
    majorBanks: ["State Bank of India", "Nagaland Rural Bank", "Axis Bank", "HDFC Bank", "ICICI Bank"],
    totalPostalDivisionsEstimated: 4
  },
  {
    stateName: "Odisha",
    slug: "odisha",
    postalCircle: "Odisha Circle",
    pincodePrefix: "75–77",
    majorDistricts: ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Baripada"],
    majorBanks: ["State Bank of India", "Odisha Gramya Bank", "Utkal Grameen Bank", "Bank of India", "Punjab National Bank", "HDFC Bank"],
    totalPostalDivisionsEstimated: 27
  },
  {
    stateName: "Punjab",
    slug: "punjab",
    postalCircle: "Punjab Circle",
    pincodePrefix: "14–16",
    majorDistricts: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Hoshiarpur", "Mohali", "Pathankot", "Moga"],
    majorBanks: ["State Bank of India", "Punjab National Bank", "Punjab & Sind Bank", "Punjab Gramin Bank", "HDFC Bank", "ICICI Bank"],
    totalPostalDivisionsEstimated: 22
  },
  {
    stateName: "Rajasthan",
    slug: "rajasthan",
    postalCircle: "Rajasthan Circle",
    pincodePrefix: "30–34",
    majorDistricts: ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Sikar", "Pali"],
    majorBanks: ["State Bank of India", "Baroda Rajasthan Kshetriya Gramin Bank", "Rajasthan Marudhara Gramin Bank", "PNB", "HDFC Bank"],
    totalPostalDivisionsEstimated: 42
  },
  {
    stateName: "Sikkim",
    slug: "sikkim",
    postalCircle: "North East Circle",
    pincodePrefix: "737",
    majorDistricts: ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Singtam", "Rangpo"],
    majorBanks: ["State Bank of India", "Sikkim State Cooperative Bank", "Central Bank of India", "HDFC Bank", "Axis Bank"],
    totalPostalDivisionsEstimated: 4
  },
  {
    stateName: "Tamil Nadu",
    slug: "tamil-nadu",
    postalCircle: "Tamil Nadu Circle",
    pincodePrefix: "60–64",
    majorDistricts: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore", "Thoothukudi"],
    majorBanks: ["State Bank of India", "Indian Overseas Bank", "Indian Bank", "Tamil Nadu Grama Bank", "City Union Bank", "HDFC Bank"],
    totalPostalDivisionsEstimated: 38
  },
  {
    stateName: "Telangana",
    slug: "telangana",
    postalCircle: "Telangana Circle",
    pincodePrefix: "50",
    majorDistricts: ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Ramagundam", "Mahabubnagar", "Nalgonda"],
    majorBanks: ["State Bank of India", "Telangana Grameena Bank", "Andhra Pradesh Grameena Vikas Bank", "HDFC Bank", "ICICI Bank"],
    totalPostalDivisionsEstimated: 26
  },
  {
    stateName: "Tripura",
    slug: "tripura",
    postalCircle: "North East Circle",
    pincodePrefix: "799",
    majorDistricts: ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar", "Belonia", "Khowai"],
    majorBanks: ["State Bank of India", "Tripura Gramin Bank", "United Bank of India", "HDFC Bank", "ICICI Bank"],
    totalPostalDivisionsEstimated: 5
  },
  {
    stateName: "Uttar Pradesh",
    slug: "uttar-pradesh",
    postalCircle: "Uttar Pradesh Circle",
    pincodePrefix: "20–28",
    majorDistricts: ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Prayagraj", "Bareilly", "Aligarh", "Moradabad", "Noida"],
    majorBanks: ["State Bank of India", "Punjab National Bank", "Bank of Baroda", "Aryavart Bank", "Baroda UP Gramin Bank", "Prathama U.P. Gramin Bank"],
    totalPostalDivisionsEstimated: 75
  },
  {
    stateName: "Uttarakhand",
    slug: "uttarakhand",
    postalCircle: "Uttarakhand Circle",
    pincodePrefix: "24–26",
    majorDistricts: ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh", "Almora", "Nainital"],
    majorBanks: ["State Bank of India", "Uttarakhand Gramin Bank", "Punjab National Bank", "Bank of Baroda", "HDFC Bank", "ICICI Bank"],
    totalPostalDivisionsEstimated: 13
  },
  {
    stateName: "West Bengal",
    slug: "west-bengal",
    postalCircle: "West Bengal Circle",
    pincodePrefix: "70–74",
    majorDistricts: ["Kolkata", "Howrah", "Darjeeling", "Siliguri", "Asansol", "Durgapur", "Bardhaman", "Malda", "Kharagpur", "Kalyani"],
    majorBanks: ["State Bank of India", "UCO Bank", "Allahabad Bank (Merged with Indian Bank)", "Bangiya Gramin Vikash Bank", "HDFC Bank", "ICICI Bank"],
    totalPostalDivisionsEstimated: 41
  },
  {
    stateName: "Andaman and Nicobar Islands",
    slug: "andaman-and-nicobar-islands",
    postalCircle: "A & N Islands Circle",
    pincodePrefix: "744",
    majorDistricts: ["Port Blair", "Nicobar", "Mayabunder", "Car Nicobar", "Diglipur", "Havelock Island"],
    majorBanks: ["State Bank of India", "Andaman and Nicobar State Cooperative Bank", "Syndicate Bank", "UCO Bank", "HDFC Bank"],
    totalPostalDivisionsEstimated: 3
  },
  {
    stateName: "Chandigarh",
    slug: "chandigarh",
    postalCircle: "Punjab Circle",
    pincodePrefix: "160",
    majorDistricts: ["Chandigarh Sector 1-63", "Manimajra", "Industrial Area Phase I & II"],
    majorBanks: ["State Bank of India", "Punjab National Bank", "Chandigarh State Cooperative Bank", "HDFC Bank", "ICICI Bank", "Axis Bank"],
    totalPostalDivisionsEstimated: 2
  },
  {
    stateName: "Dadra and Nagar Haveli and Daman and Diu",
    slug: "dadra-and-nagar-haveli-and-daman-and-diu",
    postalCircle: "Gujarat Circle",
    pincodePrefix: "396",
    majorDistricts: ["Silvassa", "Daman", "Diu", "Naroli", "Dadra"],
    majorBanks: ["State Bank of India", "Bank of Baroda", "Dena Bank (Merged with BoB)", "HDFC Bank", "ICICI Bank"],
    totalPostalDivisionsEstimated: 3
  },
  {
    stateName: "Delhi",
    slug: "delhi",
    postalCircle: "Delhi Circle",
    pincodePrefix: "11",
    majorDistricts: ["New Delhi", "Central Delhi", "South Delhi", "North Delhi", "East Delhi", "West Delhi", "Dwarka", "Rohini", "Connaught Place"],
    majorBanks: ["State Bank of India", "Punjab National Bank", "Bank of Baroda", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank"],
    totalPostalDivisionsEstimated: 11
  },
  {
    stateName: "Jammu and Kashmir",
    slug: "jammu-and-kashmir",
    postalCircle: "J & K Circle",
    pincodePrefix: "18–19",
    majorDistricts: ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Kulgam", "Udhampur", "Kathua", "Rajouri", "Sopore"],
    majorBanks: ["Jammu & Kashmir Bank", "State Bank of India", "J&K Grameen Bank", "Punjab National Bank", "HDFC Bank", "ICICI Bank"],
    totalPostalDivisionsEstimated: 20
  },
  {
    stateName: "Ladakh",
    slug: "ladakh",
    postalCircle: "J & K Circle",
    pincodePrefix: "194",
    majorDistricts: ["Leh", "Kargil", "Diskit", "Nubra", "Zanskar", "Drass"],
    majorBanks: ["Jammu & Kashmir Bank", "State Bank of India", "Punjab National Bank", "HDFC Bank"],
    totalPostalDivisionsEstimated: 4
  },
  {
    stateName: "Lakshadweep",
    slug: "lakshadweep",
    postalCircle: "Kerala Circle",
    pincodePrefix: "682",
    majorDistricts: ["Kavaratti", "Agatti", "Minicoy", "Androth", "Kalpeni", "Kadmat"],
    majorBanks: ["State Bank of India", "Syndicate Bank", "Canara Bank", "HDFC Bank"],
    totalPostalDivisionsEstimated: 2
  },
  {
    stateName: "Puducherry",
    slug: "puducherry",
    postalCircle: "Tamil Nadu Circle",
    pincodePrefix: "605",
    majorDistricts: ["Puducherry", "Karaikal", "Mahe", "Yanam"],
    majorBanks: ["State Bank of India", "Indian Bank", "Puducherry State Cooperative Bank", "HDFC Bank", "ICICI Bank"],
    totalPostalDivisionsEstimated: 4
  }
];

export function getStateBySlug(slug: string): StateDirectoryInfo | undefined {
  return INDIA_STATES_DIRECTORY.find((s) => s.slug === slug);
}
