using System;
namespace Coiner.Model
{
    public class GetBalanceRequest
    {

        public string name { get; set; }
        public Credetials auth { get; set; }
        public string address { get; set; }
    }
}
