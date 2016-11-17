namespace CV.DAL.CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NSI09.CV_FRAGMENT_TYPE")]
    public partial class CV_FRAGMENT_TYPE
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public CV_FRAGMENT_TYPE()
        {
            CV_XML_FRAGMENT = new HashSet<CV_XML_FRAGMENT>();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID { get; set; }

        [Required]
        [StringLength(35)]
        public string FRAGMENT_TYPE { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CV_XML_FRAGMENT> CV_XML_FRAGMENT { get; set; }
    }
}
