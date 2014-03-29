using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace AngularSpaTest3.Controllers
{
    public class CartItemsController : ApiController
    {
        private static readonly List<CartItem> CartItems =
            new List<CartItem>
            {
                new CartItem
                {
                    id = 1,
                    name = "Block",
                    quantity = 2,
                    price = 14.99m
                },
                new CartItem
                {
                    id = 2,
                    name = "Nabi 2",
                    quantity = 1,
                    price = 149.99m
                },
                new CartItem
                {
                    id = 3,
                    name = "Tin Robot",
                    quantity = 4,
                    price = 5.99m
                }
            };

        // GET api/values
        public IEnumerable<CartItem> Get()
        {
            return CartItems;
        }

        // GET api/values/5
        public CartItem Get(int id)
        {
            return GetItem(id);
        }

        
        // POST api/values
        public void Post(CartItem item)
        {
            CartItems.Add(item);
        }

        // PUT api/values/5
        public void Put(int id, CartItem item)
        {
            var itemToUpdate = GetItem(id);
            item.id = id;
            itemToUpdate = item;
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
            CartItem cartItem = GetItem(id);
            CartItems.Remove(cartItem);
        }

        private static CartItem GetItem(int id)
        {
            return CartItems.Single(i => i.id == id);
        }
    }

    public class CartItem
    {
        public int id { get; set; }
        public string name { get; set; }
        public decimal price { get; set; }
        public int quantity { get; set; }
    }
}