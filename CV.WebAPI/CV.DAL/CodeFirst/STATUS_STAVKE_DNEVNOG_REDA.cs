namespace CV.DAL.CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NSI09.STATUS_STAVKE_DNEVNOG_REDA")]
    public partial class STATUS_STAVKE_DNEVNOG_REDA
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public STATUS_STAVKE_DNEVNOG_REDA()
        {
            STAVKA_DNEVNOG_REDA = new HashSet<STAVKA_DNEVNOG_REDA>();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID { get; set; }

        [Required]
        [StringLength(20)]
        public string NAZIV { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<STAVKA_DNEVNOG_REDA> STAVKA_DNEVNOG_REDA { get; set; }
    }
}
