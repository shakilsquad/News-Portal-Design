const handelNewsPortal = async()  =>{
      const responsive = await fetch('https://openapi.programming-hero.com/api/news/categories');
      const data = await responsive.json();
      const newsData = data.data

      const tabContainer = document.getElementById('tab_container');
      newsData.news_category.forEach((category ) =>{
            // console.log(category);
            const div = document.createElement('div');
            div.innerHTML  = `
            <a onClick="handelNewsCategory('${category.category_id}')" id="" class=" text-sm md:text-3xl tab tab-lifted border-8 border-amber-500">${category?.category_name}</a>
            
            `
            tabContainer.appendChild(div);
      })

//    console.log(newsData?.news_category);
}

const handelNewsCategory = async (categoryId) =>{
      const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
      const data = await response.json();
      const categoryIdData = data.data

      const cardContainerItems = document.getElementById('news_cart_container');
      cardContainerItems.innerHTML = " ";
      categoryIdData.forEach((news_items) =>{
            console.log(news_items)
            const div = document.createElement('div');
            div.innerHTML=`
                        <div class="  flex py-5 flex-col md:flex-row">
                        <!-- image section -->
                        <div class="  flex  lg:w-6/12">
                              <img class=" w-full " src="${news_items?.thumbnail_url}" alt="">
                        </div>
                        <!-- content section -->
                        <div class="p-[30px]  bg-white"> 
                              <div class=" md:pt-6">
                                    <h1 class=" text-3xl md:text-5xl">${news_items?.title}</h1>
                                          <br>
                                    <h1 class="text-xl py-5 ">${news_items?.details.slice(0,300)}</h1>
                              </div>
                              <!-- bottom-section  -->
                              <div class="grid lg:gap-3 grid-cols-1 md:grid-cols-4 justify-between items-center md:pt-[70px] ">
                                    <div class="flex gap-2">
                                          <div>
                                                <img class="h-[50px] w-[50px]" src="${news_items?.author?.img}" alt="">
                                          </div>
                                          <div>
                                                <h1>${news_items?.author?.name}</h1>
                                                <h1>${news_items?.author?.published_date}</h1>
                                          </div>
                                    </div>
                                    <div class=" md:text-xl flex md:justify-center items-center gap-1"> <i class="text-[#0b7ffa]  fa-solid fa-eye"></i> ${news_items?.total_view ? news_items?.total_view :"no views" }</div>
                                    <h1><i class=" text-orange-400 fa-solid fa-star"> </i> ${news_items?.rating?.number}</h1>
                                    
                                    <div   class="flex md:justify-end">
                                          <button>
                                                <i onClick=handelModal('${news_items._id}')  class=" flex justify-end md:text-5xl fa-solid fa-arrow-right">
                                                </i>
                                          </button> 
                                    </div>
                              </div>
                        </div>
                  </div>
            `
            cardContainerItems.appendChild(div)
      })
      // console.log(categoryIdData)
}



const handelModal = async  (newsId) =>{
      console.log(newsId)
      const response = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
      const data = await response.json();
      const modalData = data.data[0]
      console.log(modalData);

      const modalContainer = document.getElementById('modal-container');
      const div = document.createElement('div');
      div.innerHTML = `
            <dialog id="my_modal_1" class="modal">
            <div class="modal-box">
            <h3 class="font-bold text-lg">${modalData?.author?.name}</h3>
            <p class="py-4">Press ESC key or click the button below to close</p>
            <div class="modal-action">
                  <form method="dialog">
                  <!-- if there is a button in form, it will close the modal -->
                  <button class="btn">Close</button>
                  </form>
            </div>
            </div>
            </dialog>
      `
      modalContainer.appendChild(div);
      const modal =document.getElementById('my_modal_1');
      modal.showModal()
}
// handelModal()

handelNewsCategory('01')

handelNewsPortal()