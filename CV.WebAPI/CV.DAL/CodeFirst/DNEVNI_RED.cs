namespace CV.DAL.CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NSI09.DNEVNI_RED")]
    public partial class DNEVNI_RED
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DNEVNI_RED()
        {
            STAVKA_DNEVNOG_REDA = new HashSet<STAVKA_DNEVNOG_REDA>();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID { get; set; }

        public decimal SJEDNICA_ID { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<STAVKA_DNEVNOG_REDA> STAVKA_DNEVNOG_REDA { get; set; }

        public virtual SJEDNICA SJEDNICA { get; set; }
    }
}
