
var contactImageElement = document.getElementById("contactImage");
var contactNameElement = document.getElementById("contactName");
var contactPhoneElement = document.getElementById("contactPhone");
var contactEmailElement = document.getElementById("contactEmail");
var contactAddressElement = document.getElementById("contactAddress");
var contactGroupElement = document.getElementById("contactGroup");
var contactNotesElement = document.getElementById("contactNotes");
var isfavoriteElement = document.getElementById("favorite");
var isemergencyElement = document.getElementById("emergency");
// input
searchInputElement =document.getElementById("searchInput")
//count
var totalcountElement = document.getElementById("totalcount");
var favoritecountElement = document.getElementById("favoritecount");
var emergencycountElement = document.getElementById("emergencycount");
var countparagraphElement  = document.getElementById("countparagraph");
//row data
var rowDataElement = document.getElementById("rowData");
//lists
var favoriteListElement =document.getElementById("favoriteList");
var emergencyListElement =document.getElementById("emergencyList");
//bottom
var saveContantBtnElement = document.getElementById("saveContantBtn");
var updatecontantBtnElement = document.getElementById("updatecontantBtn");
//model
 var model = document.getElementById("exampleModal");
 //update index
 var updateIndex = 0;

var contacts = JSON.parse(localStorage.getItem("contacts")) || [];
displayContacts(contacts);

function saveContant() {
    
   var newContact ={
    contactImage : contactImageElement.value,
    contactName : contactNameElement.value,
    contactPhone : contactPhoneElement.value,
    contactEmail : contactEmailElement.value,
    contactAddress : contactAddressElement.value,
    contactGroup : contactGroupElement.value,
    contactNotes :  contactNotesElement.value,
    isfavorite :  isfavoriteElement.checked,
    isemergency :  isemergencyElement.checked
   }
   
   contacts.push(newContact);
   saveTolocalStorage(contacts);
   displayContacts(contacts);

   Swal.fire({
  title: "Contact Saved",
  icon: "success"
});
 closeModel();
}

function clear() {
    contactImageElement.value = "";
    contactNameElement.value  = "";
    contactPhoneElement.value = "";
    contactEmailElement.value = "";
    contactAddressElement.value = "";
    contactGroupElement.value = "";
    contactNotesElement.value = "";
    isfavoriteElement.checked = false;
    isemergencyElement.checked = false;
    
}

function closeModel() {
    clear();
    var Mymodel = bootstrap.Modal.getOrCreateInstance(model);
    Mymodel.hide();
}

function saveTolocalStorage(data) {
    localStorage.setItem('contacts',JSON.stringify(data));

}
function deletFromlocalStorage(data) {
    localStorage.removeItem(JSON.parse(data));
}

function displayContacts(data) {
  totalcountElement.innerHTML= data.length;
  countparagraphElement.innerHTML= data.length;
  var favorite = 0 ; 
  var emergency = 0;
  var box ="";
  var favbox = "";
  var emergbox = "";



  
if (data.length === 0) {
    box = `
    <div class="empty-state text-center">
      <div class="empty-icon">
        <i class="fa-solid fa-address-book"></i>
      </div>

      <h4 class="mb-1 fw-bold">No contacts found</h4>

      <p class="m-0 text-secondary">Click "Add Contact" to get started</p>
    </div>
    `
  }else{


    for (var  i = 0 ; i < data.length ; i++ ) {

        if (data[i].isfavorite) {
          favbox += `<!-- Contact -->
              
                <div
                  class="mini-contact d-flex align-items-center gap-2 rounded-4 p-3 bg-body-tertiary"
                >
                  <div
                    class="mini-avatar d-flex align-items-center justify-content-center rounded-4"
                  >
                    <span>${data[i].contactName.split(' ')[0][0]+data[i].contactName.split(' ')[1][0]}</span>
                  </div>

                  <div class="flex-grow-1">
                    <h6 class="mb-1">${data[i].contactName}</h6>
                    <p class="mb-0">${data[i].contactPhone}</p>
                  </div>

                  <a href="tel:${data[i].contactPhone}" class="mini-call favorites-call">
                    <i class="fa-solid fa-phone"></i>
                  </a>
                </div>
              
           
          
          ` 
        }
        if (data[i].isemergency) {
          emergbox += `
           <div class="mini-contact d-flex align-items-center gap-2 rounded-4 p-3 bg-body-tertiary">
                  <div
                    class="mini-avatar d-flex align-items-center justify-content-center rounded-4"
                  >
                    <span>${data[i].contactName.split(' ')[0][0]+data[i].contactName.split(' ')[1][0]}</span>
                  </div>

                  <div class="flex-grow-1">
                    <h6 class="mb-1">${data[i].contactName}</h6>
                    <p class="mb-0">${data[i].contactPhone}</p>
                  </div>

                  <a href="tel:" class="mini-call emergency-call">
                    <i class="fa-solid fa-phone"></i>
                  </a>
                </div>
          
          `
          
        }

        box += `
                <div class="col-12 col-lg-6">
                  <div class="contact-card">
                    <!-- Card Body -->
                    <div class="contact-card-body p-3">
                      <!-- Top Section -->
                      <div class="d-flex align-items-start gap-3">
                        <!-- Avatar -->
                        <div
                          class="avatar d-flex align-items-center justify-content-center position-relative rounded-4
                          ${data[i].isfavorite &&"has-star"} ${data[i].isemergency &&"has-heart"}"
                        >
                          <span>
                              ${data[i].contactName.split(' ')[0][0] + 
                              (data[i].contactName.split(' ')[1]?.[0] || '')}
                          </span>

                        </div>

                        <!-- Contact Info -->
                        <div class="contact-info">
                          <h5 class="contact-name mb-2 fw-bold">${data[i].contactName}</h5>

                          <div
                            class="phone-row d-flex align-items-center gap-2"
                          >
                            <span class="contact-icon phone-icon">
                              <i class="fa-solid fa-phone"></i>
                            </span>

                            <span>${data[i].contactPhone}</span>
                          </div>
                        </div>
                      </div>

                      <!-- Email -->
                      <div class="contact-row d-flex align-items-center gap-3">
                        <span class="contact-icon email-icon">
                          <i class="fa-solid fa-envelope"></i>
                        </span>

                        <span>${data[i].contactEmail}</span>
                      </div>

                      <!-- Location -->
                      <div class="contact-row d-flex align-items-center gap-3">
                        <span class="contact-icon location-icon">
                          <i class="fa-solid fa-location-dot"></i>
                        </span>

                        <span>${data[i].contactAddress}</span>
                      </div>

                      <!-- Tags -->
                      <div class="d-flex align-items-center gap-2 mt-3">
                      <span class="${
                          data[i].contactGroup === "Family"
                              ? "family-badge badge"
                              : data[i].contactGroup === "Friends"
                              ? "friends-badge badge"
                              : data[i].contactGroup === "Work"
                              ? "work-badge badge"
                              : data[i].contactGroup === "Other"
                              ? "other-badge badge"
                              : ""
                              }">
                            ${data[i].contactGroup}
                      </span>


                        ${data[i].isemergency ? `<span class="badge emergency-badge">
                          <i class="fa-solid fa-heart-pulse me-1"></i>
                          Emergency
                        </span>`:""}
                          ${data[i].isfavorite ? `<span class="badge favorite-badge">
                          <i class="fa-solid fa-star"></i>
                          Favorite
                        </span>`:""}
                        

                      </div>
                    </div>

                    <!-- Bottom Actions -->
                    <div class="contact-card-footer">
                      <!-- Left buttons -->
                      <div class="d-flex gap-2">
                        <a href="tel:${data[i].contactPhone}" class="action-btn call-btn">
                          <i class="fa-solid fa-phone"></i>
                        </a>

                        <a href="mailto:${data[i].contactEmail}" class="action-btn mail-btn">
                          <i class="fa-solid fa-envelope"></i>
                        </a>
                      </div>

                      <!-- Right buttons -->
                      <div class="d-flex gap-2">
                        <button onclick="toggleFavorite(${i})" class="action-btn star ${data[i].isfavorite && "star-active"}">
                          <i class="fa-solid fa-star"></i>
                        </button>

                        <button onclick="toggleEmergency(${i})" class="action-btn heart ${data[i].isemergency && "heart-active"}">
                          <i class="fa-solid fa-heart-pulse"></i>
                        </button>

                        <button onclick="getContantForUpdate(${i})" class="action-btn  edit-btn">
                          <i class="fa-solid fa-pen"></i>
                        </button>

                        <button onclick="deleteContact(${i})" class=" action-btn delete-btn">
                          <i class="fa-solid fa-trash"></i>
                        </button>
                        
                      </div>
                    </div>
                  </div>
                </div>
        
        `
        if (data[i].isfavorite) {
          favorite ++; 
        }
        if (data[i].isemergency) {
          emergency++ ;
          
        }
        
        
    }
    


  }
  if (favorite === 0) {
    favbox = `
        <p class="text-center text-secondary p-3 mb-0">
            No favorite contacts
        </p>
    `;
}

if (emergency === 0) {
    emergbox = `
        <p class="text-center text-secondary p-3 mb-0">
            No emergency contacts
        </p>
    `;
}



    
    rowDataElement.innerHTML = box;
    favoriteListElement.innerHTML=favbox ;
    emergencyListElement.innerHTML=emergbox;
    favoritecountElement.innerHTML = favorite;
    emergencycountElement.innerHTML = emergency;
}

function deleteContact(index) {
  Swal.fire({
  title: "Do you want to delete the contact?",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "green",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed){
  contacts.splice(index,1);
  saveTolocalStorage(contacts);
  displayContacts(contacts);
   Swal.fire({
    title: "Deleted!",
    text: "Your file has been deleted.",
    icon: "success"
  });

  }
});

  
}



function getContantForUpdate(index) {
    var Mymodel = bootstrap.Modal.getOrCreateInstance(model);
    Mymodel.show();

    updateIndex = index ;

    contactNameElement.value = contacts[index].contactName;
    contactPhoneElement.value = contacts[index].contactPhone;
    contactEmailElement.value = contacts[index].contactEmail;
    contactAddressElement.value = contacts[index].contactAddress;
    contactGroupElement.value = contacts[index].contactGroup;
    contactNotesElement.value = contacts[index].contactNotes;
    isfavoriteElement.checked = contacts[index].isfavorite;
    isemergencyElement.checked = contacts[index].isemergency;

    saveContantBtnElement.classList.add('d-none');
    updatecontantBtnElement.classList.remove('d-none');
}

function updateContact() {

  var NewUpdatecontant ={
    contactImage : contactImageElement.value,
    contactName : contactNameElement.value,
    contactPhone : contactPhoneElement.value,
    contactEmail : contactEmailElement.value,
    contactAddress : contactAddressElement.value,
    contactGroup : contactGroupElement.value,
    contactNotes :  contactNotesElement.value,
    isfavorite :  isfavoriteElement.checked,
    isemergency :  isemergencyElement.checked

  }
  contacts[updateIndex] = NewUpdatecontant
   saveTolocalStorage(contacts);
   displayContacts(contacts);
   closeModel();

  saveContantBtnElement.classList.remove('d-none');
  updatecontantBtnElement.classList.add('d-none');

Swal.fire({
  title: "Updated!",
  text: "You contact has been Updated",
  icon: "success"
});
}

function searchContact(input) {

    setTimeout(function () {

        var tempData = [];

        for (var i = 0; i < contacts.length; i++) {

            if (
                contacts[i].contactName.toLowerCase().includes(input.toLowerCase()) ||
                contacts[i].contactPhone.includes(input) ||
                contacts[i].contactAddress.toLowerCase().includes(input.toLowerCase())
            ) {

                tempData.push(contacts[i]);

            }
        }

        displayContacts(tempData);

    }, 500);
}
function toggleFavorite(index) {

    contacts[index].isfavorite = !contacts[index].isfavorite;

    saveTolocalStorage(contacts);
    displayContacts(contacts);
}
function toggleEmergency(index) {

    contacts[index].isemergency = !contacts[index].isemergency;

    saveTolocalStorage(contacts);
    displayContacts(contacts);
}