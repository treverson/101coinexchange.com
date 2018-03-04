using System;
namespace Coiner.Model
{
    public class GetBalanceResponse
    {
        public StatusResponse status { get; set; }
        public string balance { get; set; }
    }
}
