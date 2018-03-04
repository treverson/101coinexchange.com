using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

//using RestSharp;
using Coiner.Model;
using System.IO;
using Newtonsoft.Json;

namespace Coiner.Pages
{

    public class IndexModel : PageModel
    {

        public JsonResult OnGetList()
        {
            List<string> lstString = new List<string>
            {
                "Val 1",
                "Val 2",
                "Val 3"
            };
            return new JsonResult(lstString);
        }

        public JsonResult OnPostList(Credetials auth)
        {
            List<string> lstString = new List<string>
            {
                "Val 1",
                "Val 2",
                "Val 3"
            };

            try{
                MemoryStream stream = new MemoryStream();
                Request.Body.CopyTo(stream);
                stream.Position = 0;
                using (StreamReader reader = new StreamReader(stream))
                {
                    string requestBody = reader.ReadToEnd();
                    if (requestBody.Length > 0)
                    {
                        var obj = JsonConvert.DeserializeObject<GetBalanceRequest>(requestBody);
                        if (obj != null)
                        {
                            var sPostValue1 = obj.auth.user;
                            var sPostValue3 = obj.auth.pass;
                        }
                    }
                }
            }

            catch(Exception ex)
            {
                Console.Write(ex.Message);
            }


            return new JsonResult(lstString);
        }

        public void OnPost()
        {
            Console.Write("Ok");
        }

        public void OnGet()
        {
        /*
            string serviceURL = "http://192.168.0.12:3000";
            try
            {
                GetBalanceRequest getBalance = new GetBalanceRequest()
                {
                    auth = new Credetials()
                    {
                        user = "convertor",
                        pass = "asdASD123"
                    },
                    name = "get-balance",
                    address = "0xc20e277EDcb4a7bC03D5fCbd3b577086E3572A2F"
                };

                var client = new RestClient(serviceURL);
                var request = new RestRequest("", Method.POST);
                request.AddJsonBody(getBalance);

                var response = client.Execute<GetBalanceResponse>(request);
                if (response == null || response.Data == null || response.Data.status.code < 0)
                    throw(new Exception( (response == null || response.Data == null) ? "Call failed" : response.Data.status.message ))

                Console.Write("Ok");

            }
            catch(Exception ex){
                Console.Write(ex.Message);
        */
        }
    }
}
