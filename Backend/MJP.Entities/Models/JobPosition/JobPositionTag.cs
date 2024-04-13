using System;

namespace MJP.Entities.Models
{
    public class JobPositionTag : MJPEntity
    {
    
        public int JobPositionTagId { get; set;}   

        public int JobPositionId { get; set; }

        public string TagName { get; set; }

        public string Remarks { get; set;}
    }


}
