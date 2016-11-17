namespace CV.DAL.CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NSI09.DUMMY_TABLE")]
    public partial class DUMMY_TABLE
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public short DUMMY { get; set; }
    }
}
