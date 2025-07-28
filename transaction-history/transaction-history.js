// This is a Dummy Data Array. 
// This was used to test the page while
//  we await the API Endpoint from the Backend.
  // const dummyTransactions = [
  //   {
  //     name: "Empress Tope",
  //     time: "10:24am, 19-05-2025",
  //     amount: "-#2,000.00",
  //     type: "debit",
  //     image: "../src/images/image 13.png"
  //   },
  //   {
  //     name: "Oyin Tope",
  //     time: "10:30am, 19-05-2025",
  //     amount: "+#2,000,000.00",
  //     type: "credit",
  //     image: "../src/images/image 14.png"
  //   },
  //   {
  //     name: "Jide Max",
  //     time: "11:45am, 19-05-2025",
  //     amount: "-#5,000.00",
  //     type: "debit",
  //     image: "../src/images/image 13.png"
  //   },
  //   {
  //     name: "Empress Tope",
  //     time: "10:24am, 19-05-2025",
  //     amount: "-#2,000.00",
  //     type: "debit",
  //     image: "../src/images/image 13.png"
  //   },
  //   {
  //     name: "Oyin Tope",
  //     time: "10:30am, 19-05-2025",
  //     amount: "+#2,000,000.00",
  //     type: "credit",
  //     image: "../src/images/image 14.png"
  //   },
  //   {
  //     name: "Jide Max",
  //     time: "11:45am, 19-05-2025",
  //     amount: "-#5,000.00",
  //     type: "debit",
  //     image: "../src/images/image 13.png"
  //   },
  //   {
  //     name: "Empress Tope",
  //     time: "10:24am, 19-05-2025",
  //     amount: "-#2,000.00",
  //     type: "debit",
  //     image: "../src/images/image 13.png"
  //   },
  //   {
  //     name: "Oluwaseun Shedrach",
  //     time: "10:30am, 19-05-2025",
  //     amount: "+#2,000,000.00",
  //     type: "credit",
  //     image: "../src/images/image 14.png"
  //   },
  //   {
  //     name: "Jide Max",
  //     time: "11:45am, 19-05-2025",
  //     amount: "-#5,000.00",
  //     type: "debit",
  //     image: "../src/images/image 13.png"
  //   },
  //   {
  //     name: "Empress Tope",
  //     time: "10:24am, 19-05-2025",
  //     amount: "-#2,000.00",
  //     type: "debit",
  //     image: "../src/images/image 13.png"
  //   },
  //   {
  //     name: "Oluwaseun Shedrach",
  //     time: "10:30am, 19-05-2025",
  //     amount: "+#2,000,000.00",
  //     type: "credit",
  //     image: "../src/images/image 14.png"
  //   },
  //   {
  //     name: "Jide Max",
  //     time: "11:45am, 19-05-2025",
  //     amount: "-#5,000.00",
  //     type: "debit",
  //     image: "../src/images/image 13.png"
  //   },
  //    {
  //     name: "Empress Tope",
  //     time: "10:24am, 19-05-2025",
  //     amount: "-#2,000.00",
  //     type: "debit",
  //     image: "../src/images/image 13.png"
  //   },
  //   {
  //     name: "Oluwaseun Shedrach",
  //     time: "10:30am, 19-05-2025",
  //     amount: "+#2,000,000.00",
  //     type: "credit",
  //     image: "../src/images/image 14.png"
  //   },
  //   {
  //     name: "Jide Max",
  //     time: "11:45am, 19-05-2025",
  //     amount: "-#5,000.00",
  //     type: "debit",
  //     image: "../src/images/image 13.png"
  //   },
  // ];

  // const transactionList = document.getElementById("transactionList");
  // const searchInput = document.getElementById("searchInput");

  // Render transactions
  // function renderTransactions(data) {
  //   transactionList.innerHTML = ""; // Clear before re-adding
  //   data.forEach(tx => {
  //     const wrapper = document.createElement("div");
  //     wrapper.className = "flex justify-between items-center p-4 border-b";
  //     wrapper.innerHTML = `
  //       <div class="flex gap-2">
  //         <img src="${tx.image}" alt="wallet" width="40" />
  //         <div>
  //           <p class="font-light font-['Poppins']">${tx.name}</p>
  //           <p class="text-sm font-light">${tx.time}</p>
  //         </div>
  //       </div>
  //       <div>
  //         <p class="font-['Poppins'] ${tx.type === 'credit' ? 'text-green-500' : 'text-red-500'}">
  //           ${tx.amount}
  //         </p>
  //       </div>
  //     `;
  //     transactionList.appendChild(wrapper);
  //   });
  // }

  // Filter and render
  // function handleSearch(e) {
  //   const searchTerm = e.target.value.toLowerCase();
  //   const filtered = dummyTransactions.filter(tx =>
  //     tx.name.toLowerCase().includes(searchTerm)
  //   );
  //   renderTransactions(filtered);
  // }

  // Initial render with dummy data
  // renderTransactions(dummyTransactions);
  // searchInput.addEventListener("input", handleSearch);
